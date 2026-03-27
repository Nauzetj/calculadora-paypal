def calcular_monto_compra(saldo_disponible: float) -> dict:
    """
    Calcula el monto máximo que se puede enviar por PayPal / Tienda
    considerando las reglas del banco.
    """
    comision_bancaria_fija = 0.025  # 2.5%
    bloqueo_preventivo = 0.05       # 5.0%
    
    # El monto total que el banco debilita será del 107.5% de la compra original.
    factor_total = 1.0 + comision_bancaria_fija + bloqueo_preventivo # 1.075
    
    # Monto máximo de compra
    monto_compra = saldo_disponible / factor_total
    
    # Desglose
    comision = monto_compra * comision_bancaria_fija
    bloqueo = monto_compra * bloqueo_preventivo
    
    # El saldo finalmente disponible en tu cuenta después de que 
    # se libere el bloqueo temporal de seguridad.
    saldo_real_restante = saldo_disponible - (monto_compra + comision)

    return {
        "monto_compra": monto_compra,
        "comision": comision,
        "bloqueo": bloqueo,
        "saldo_real_restante": saldo_real_restante
    }

def main():
    print("\n" + "="*50)
    print("💳 Calculadora de Compras Internacionales (PayPal)")
    print("="*50)
    
    try:
        saldo_input = input("\nIngrese su Saldo Disponible en la cuenta (ej. 595): $")
        saldo = float(saldo_input)
        
        if saldo <= 0:
            print("❌ El saldo debe ser mayor a 0.")
            return
            
        resultados = calcular_monto_compra(saldo)
        
        print("\n" + "-"*50)
        print("💡 DESGLOSE DE LA OPERACIÓN")
        print("-"*50)
        print(f"✅ Monto Máximo a ingresar en PayPal:   ${resultados['monto_compra']:.2f}")
        print(f"🏦 Comisión Bancaria Definitiva (2.5%):  -${resultados['comision']:.2f}")
        print(f"🔒 Bloqueo Preventivo Temporal (5%):     -${resultados['bloqueo']:.2f} (se libera)")
        print("-"*50)
        print(f"💰 Saldo Remanente Post-Bloqueo:        ${resultados['saldo_real_restante']:.2f}")
        print("="*50 + "\n")
        
    except ValueError:
        print("❌ Entrada inválida. Por favor, ingrese un valor numérico correcto.")

if __name__ == "__main__":
    main()
