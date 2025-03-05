"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation"; // Importa useSearchParams

// Classe para gerar o código Pix
class Pix {
  private nome: string;
  private chavePix: string;
  private valor: string;
  private cidade: string;
  private txtId: string;
  private descricao: string;

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
    txtId: string,
    descricao: string
  ) {
    this.nome = nome;
    this.chavePix = chavePix;
    this.valor = valor;
    this.cidade = cidade;
    this.txtId = txtId;
    this.descricao = descricao.slice(0, 50);
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
      this.descricao
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
  const searchParams = useSearchParams();
  const total = searchParams.get("total") || "0.00";
  const description = searchParams.get("desc") || "Pedido Online";

  const [nome, setNome] = useState<string>("Isadora Ballejo");
  const [chavePix, setChavePix] = useState<string>("+5551991516671");
  const [cidade, setCidade] = useState<string>("Canoas");
  const [txtId, setTxtId] = useState<string>("Buyly");
  const [payloadCompleto, setPayloadCompleto] = useState<string>("");

  useEffect(() => {
    if (total) {
      const pix = new Pix(nome, chavePix, total, cidade, txtId, description); // Usa o valor da URL
      const payload = pix.getPayload();
      setPayloadCompleto(payload);
    }
  }, [total]); // Recalcula sempre que o total mudar

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadCompleto);
    return toast("Código Copiado!", { icon: "📋​" });
  };

  return (
    <div className="px-10 max-sm-plus:px-0 max-sm-plus:py-2 py-5 ">
      <p className="text-heading3-bold my-10 max-sm-plus:px-2">
        Pagamento com Pix
      </p>
      <div className="flex flex-col justify-center items-center gap-y-8">
        <QRCode value={payloadCompleto} />
        <div className="flex justify-center items-center w-[80%]">
          <div
            onClick={handleCopy}
            className="flex items-center gap-2 cursor-pointer bg-gray-100 rounded-lg p-4" // Garantir que há espaço entre o texto e o ícone
            title="Copiar código"
          >
            <p className="break-all flex items-center">{payloadCompleto}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagamentoPix;
