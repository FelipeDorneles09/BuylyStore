import Review from "@/lib/models/Review";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Criar uma nova review
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDB();

    const { productId, rating, comment } = await req.json();
    if (!productId || !rating || !comment) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Obter os dados do usuário via Clerk API
    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Adicionar sua chave API do Clerk
      },
    });

    const userData = await user.json();
    // Combina o first_name e last_name para criar o full name
    const userName =
      userData?.first_name && userData?.last_name
        ? `${userData.first_name} ${userData.last_name}`
        : "Anonymous"; // Se o nome não for encontrado, usa "Anonymous"

    // Criar a nova review com o nome completo do usuário
    const newReview = await Review.create({
      productId,
      userId,
      userName,
      rating,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.log("[reviews_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Obter reviews de um produto
export const GET = async (req: NextRequest) => {
  try {
    const productId = req.nextUrl.searchParams.get("productId");
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    await connectToDB();

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.log("[reviews_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
