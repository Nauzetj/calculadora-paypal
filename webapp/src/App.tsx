import { useState } from 'react';

function App() {
  const [saldo, setSaldo] = useState<number | ''>('');

  const numSaldo = typeof saldo === 'number' ? saldo : 0;
  const showResults = numSaldo > 0;

  const comisionFija = 0.025;
  const bloqueoPreventivo = 0.05;
  const factorTotal = 1.0 + comisionFija + bloqueoPreventivo; // 1.075

  const montoMaximo = numSaldo / factorTotal;
  const comision = montoMaximo * comisionFija;
  const bloqueo = montoMaximo * bloqueoPreventivo;
  const saldoReal = numSaldo - (montoMaximo + comision);

  return (
    <div className="container" style={{
      background: 'var(--card-bg)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px',
      padding: '40px', width: '100%', maxWidth: '500px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      <h1 style={{
        fontSize: '1.5rem', textAlign: 'center', marginBottom: '24px',
        fontWeight: 700, background: 'linear-gradient(to right, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        Calculadora de PayPal
      </h1>
      
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-muted)' }}>
          Saldo Disponible en Cuenta
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600 }}>$</span>
          <input 
            type="number" 
            placeholder="0.00" 
            value={saldo}
            onChange={(e) => setSaldo(e.target.value ? parseFloat(e.target.value) : '')}
            style={{
              width: '100%', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px', padding: '16px 16px 16px 40px', color: 'var(--text-main)',
              fontSize: '1.125rem', fontWeight: 600, outline: 'none'
            }}
          />
        </div>
      </div>

      {showResults && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)', borderRadius: '16px', padding: '24px', marginTop: '24px',
          animation: 'slideUp 0.4s ease'
        }}>
          <ResultRow label="Monto Máximo de Compra (Colocar en PayPal)" value={`$${montoMaximo.toFixed(2)}`} highlight />
          <ResultRow label="Comisión Bancaria (2.5%)" value={`-$${comision.toFixed(2)}`} danger />
          <ResultRow label="Bloqueo Preventivo (5%) (Se libera luego)" value={`-$${bloqueo.toFixed(2)}`} warning />
          <ResultRow label="Saldo Remanente Post-Bloqueo" value={`$${saldoReal.toFixed(2)}`} />
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Aplicación Web - GitHub Pages
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight, warning, danger }: any) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', marginBottom: '16px',
      paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', alignItems: 'center'
    }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.4, maxWidth: '60%' }}>
        {label}
      </div>
      <div style={{
        fontWeight: 700, fontSize: highlight ? '1.25rem' : '1rem',
        color: highlight ? 'var(--accent)' : warning ? 'var(--warning)' : danger ? 'var(--danger)' : 'white'
      }}>
        {value}
      </div>
    </div>
  );
}

export default App;
