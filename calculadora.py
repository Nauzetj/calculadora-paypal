def calcular_monto_requerido(monto_enviar: float) -> dict:
    """
    Calcula cuánto dinero se necesita tener en el banco para poder
    enviar una cantidad específica por PayPal.
    """
    comision_bancaria_fija = 0.025  # 2.5%
    
    # Cálculos
    comision = monto_enviar * comision_bancaria_fija
    total_requerido = monto_enviar + comision

    return {
        "monto_enviar": monto_enviar,
        "comision": comision,
        "total_requerido": total_requerido
    }

def main():
    print("\n" + "="*50)
    print("💳 Calculadora de Envíos Internacionales (PayPal)")
    print("="*50)
    
    try:
        monto_input = input("\nIngrese el monto exacto que desea enviar por PayPal: $")
        monto = float(monto_input)
        
        if monto <= 0:
            print("❌ El monto debe ser mayor a 0.")
            return
            
        resultados = calcular_monto_requerido(monto)
        
        print("\n" + "-"*50)
        print("💡 DESGLOSE DE LA OPERACIÓN")
        print("-"*50)
        print(f"✅ Monto a enviar por PayPal:            ${resultados['monto_enviar']:.2f}")
        print(f"🏦 Comisión Bancaria Definitiva (2.5%):  +${resultados['comision']:.2f}")
        print("-"*50)
        print(f"💰 Total requerido en la cuenta de banco: ${resultados['total_requerido']:.2f}")
        print("="*50 + "\n")
        
    except ValueError:
        print("❌ Entrada inválida. Por favor, ingrese un valor numérico correcto.")

if __name__ == "__main__":
    main()
