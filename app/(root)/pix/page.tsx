"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Classe para gerar o código Pix
class Pix {
  private nome: string;
  private chavePix: string;
  private valor: string;
  private cidade: string;
  private txtId: string;

  // Identificadores para os campos Pix
  private ID_PAYLOAD_FORMAT_INDICATOR = "00";
  private ID_MERCHANT_ACCOUNT_INFORMATION = "26";
  private ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
  private ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
  private ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = "02";
  private ID_MERCHANT_CATEGORY_CODE = "52";
  private ID_TRANSACTION_CURRENCY = "53";
  private ID_TRANSACTION_AMOUNT = "54";
  private ID_COUNTRY_CODE = "58";
  private ID_MERCHANT_NAME = "59";
  private ID_MERCHANT_CITY = "60";
  private ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
  private ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
  private ID_CRC16 = "63";

  constructor(
    nome: string,
    chavePix: string,
    valor: string,
    cidade: string,
    txtId: string
  ) {
    this.nome = nome;
    this.chavePix = chavePix;
    this.valor = valor;
    this.cidade = cidade;
    this.txtId = txtId;
  }

  private _getValue(id: string, value: string): string {
    const size = String(value.length).padStart(2, "0");
    return id + size + value;
  }

  private _getMerchantAccountInfo(): string {
    const gui = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI,
      "br.gov.bcb.pix"
    );
    const key = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY,
      this.chavePix
    );
    const description = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
      "" // Adicionar Descrição
    );
    return this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION,
      gui + key + description
    );
  }

  private _getAdditionalDataFieldTemplate(): string {
    const txid = this._getValue(
      this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,
      this.txtId
    );
    return this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
  }

  // Método para calcular o CRC16
  private _getCrc16(payload: string): string {
    function ord(str: string): number {
      return str.charCodeAt(0);
    }

    function dechex(number: number): string {
      return number.toString(16).padStart(4, "0").toUpperCase(); // Garante 4 caracteres
    }

    payload = payload + this.ID_CRC16 + "04"; // Adiciona identificador CRC

    let polinomio = 0x1021;
    let resultado = 0xffff;

    for (let i = 0; i < payload.length; i++) {
      resultado ^= ord(payload[i]) << 8;
      for (let bit = 0; bit < 8; bit++) {
        if ((resultado & 0x8000) !== 0) {
          resultado = (resultado << 1) ^ polinomio;
        } else {
          resultado <<= 1;
        }
      }
      resultado &= 0xffff; // Garante que continua sendo um número de 16 bits
    }

    return this.ID_CRC16 + "04" + dechex(resultado); // Retorna CRC16 com 4 caracteres
  }

  public getPayload(): string {
    const payloadFormat = this._getValue(
      this.ID_PAYLOAD_FORMAT_INDICATOR,
      "01"
    );
    const merchantAccount = this._getMerchantAccountInfo();
    const merchantCategCode = this._getValue(
      this.ID_MERCHANT_CATEGORY_CODE,
      "0000"
    );
    const transactionCurrency = this._getValue(
      this.ID_TRANSACTION_CURRENCY,
      "986"
    );
    const transactionAmount = this._getValue(
      this.ID_TRANSACTION_AMOUNT,
      this.valor
    );
    const countryCode = this._getValue(this.ID_COUNTRY_CODE, "BR");
    const merchantName = this._getValue(this.ID_MERCHANT_NAME, this.nome);
    const merchantCity = this._getValue(this.ID_MERCHANT_CITY, this.cidade);
    const additionalData = this._getAdditionalDataFieldTemplate();

    // Concatenar o payload
    const payload =
      payloadFormat +
      merchantAccount +
      merchantCategCode +
      transactionCurrency +
      transactionAmount +
      countryCode +
      merchantName +
      merchantCity +
      additionalData;

    // Adicionar CRC16
    return payload + this._getCrc16(payload);
  }
}

// Componente de pagamento Pix
const PagamentoPix = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const total = searchParams.get("total");
  const [payloadCompleto, setPayloadCompleto] = useState<string>("");
  const [countdown, setCountdown] = useState(900); // 15 minutos em segundos

  const [nome, setNome] = useState<string>("Isadora Ballejo");
  const [chavePix, setChavePix] = useState<string>("+5551991516671");
  const [cidade, setCidade] = useState<string>("Canoas");

  useEffect(() => {
    if (total && orderId) {
      // Cria um ID de transação usando o orderId
      const txtId = `${orderId}`;

      // Cria um novo objeto Pix com todos os parâmetros necessários
      const pix = new Pix(nome, chavePix, total, cidade, txtId);

      // Gera o payload do Pix
      const payload = pix.getPayload();

      // Atualiza o estado com o payload gerado
      setPayloadCompleto(payload);
    } else {
      // Redirecionar para o carrinho se não tiver os parâmetros necessários
      router.push("/cart");
    }
  }, [total, orderId, nome, chavePix, cidade, router]);

  // Contador regressivo para pagamento
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Formatar o tempo do contador
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadCompleto);
    return toast("Código Copiado!", { icon: "📋​" });
  };

  // Se o tempo expirou
  if (countdown === 0) {
    return (
      <div className="px-10 max-sm-plus:px-0 max-sm-plus:py-2 py-5">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <h1 className="text-heading3-bold my-5">
            Tempo para pagamento expirado
          </h1>
          <p className="text-base-medium mb-4">
            O tempo para completar este pagamento expirou.
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao carrinho
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 max-sm-plus:px-0 max-sm-plus:py-2 py-5">
      <h1 className="text-heading3-bold my-10 max-sm-plus:px-2">
        Pagamento com Pix
      </h1>

      <div className="flex flex-col justify-center items-center gap-y-8 max-w-4xl mx-auto">
        <div className="bg-gray-50 p-6 rounded-lg w-full">
          <div className="flex flex-col items-center">
            <p className="text-base-medium mb-4">
              Escaneie o QR Code abaixo ou copie o código PIX
            </p>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCode value={payloadCompleto} size={220} />
            </div>

            <div className="w-full mt-8">
              <p className="text-sm text-gray-500 mb-2">Código PIX:</p>
              <div
                onClick={handleCopy}
                className="flex items-center gap-2 cursor-pointer bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
                title="Copiar código"
              >
                <p className="break-all flex items-center text-sm">
                  {payloadCompleto}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="mt-2 text-blue-600 text-sm"
              >
                Copiar código
              </button>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <p className="text-base-bold text-center">
                Tempo restante para pagamento:{" "}
                <span className="text-red-500">{formatTime(countdown)}</span>
              </p>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Após realizar o pagamento via PIX, aguarde para checarmos seu
                pagamento
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg w-full">
          <h2 className="text-base-bold mb-4">Informações do pagamento</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Número do pedido:</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total a pagar:</span>
              <span className="font-medium">R$ {total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Chave PIX:</span>
              <span className="font-medium">{chavePix}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Beneficiário:</span>
              <span className="font-medium">{nome}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagamentoPix;
