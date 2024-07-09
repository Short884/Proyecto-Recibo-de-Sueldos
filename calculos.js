document.getElementById('tipoEmpleado').addEventListener('change', function() {
    const tipoEmpleado = this.value;
    
    const tarifas = {
        1: 53.27,
        2: 45.39,
        3: 41.85,
        4: 38.42
    };
    
    const campoDineroPorHora = document.getElementById('dineroPorHora');
    
    if (tipoEmpleado) {
        campoDineroPorHora.value = `$${tarifas[tipoEmpleado]}`;
    } else {
        campoDineroPorHora.value = '';
    }
});

document.getElementById('formularioSalario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const cuil = document.getElementById('cuil').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const tipoEmpleado = document.getElementById('tipoEmpleado').value;
    const horasTrabajadas = parseFloat(document.getElementById('horasTrabajadas').value);
    const porcentajeJubilacion = parseFloat(document.getElementById('porcentajeJubilacion').value) / 100;
    const porcentajeObraSocial = parseFloat(document.getElementById('porcentajeObraSocial').value) / 100;
    const porcentajeLey23032 = parseFloat(document.getElementById('porcentajeLey23032').value) / 100;
    const asignacionFamiliar = parseFloat(document.getElementById('asignacionFamiliar').value) || 0;
    
    const tarifas = {
        1: 53.27,
        2: 45.39,
        3: 41.85,
        4: 38.42
    };
    
    if (nombreCompleto && cuil && fechaIngreso && tipoEmpleado && horasTrabajadas) {
        const tarifaPorHora = tarifas[tipoEmpleado];
        const salarioTotal = tarifaPorHora * horasTrabajadas;
        
        document.getElementById('resultado').innerText = `Nombre y Apellido: ${nombreCompleto}
CUIL: ${cuil}
Fecha de Ingreso: ${fechaIngreso}
Remuneración total: $${salarioTotal.toFixed(2)}`;
        
        // Calcular los conceptos del recibo
        const horas50 = horasTrabajadas * 0.5 * tarifaPorHora;
        const horas100 = horasTrabajadas * tarifaPorHora;
        const jubilacion = salarioTotal * porcentajeJubilacion;
        const obraSocial = salarioTotal * porcentajeObraSocial;
        const ley23032 = salarioTotal * porcentajeLey23032;
        
        const totalRemunerativo = horas50 + horas100;
        const totalDescuento = jubilacion + obraSocial + ley23032;
        const totalNoRemunerativo = asignacionFamiliar;
        
        document.getElementById('recibo').innerHTML = `
            <h2>Recibo de Sueldo</h2>
            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Cantidad</th>
                        <th>Remunerativo</th>
                        <th>Descuento</th>
                        <th>No Remunerativo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Horas 50%</td>
                        <td>${horasTrabajadas * 0.5}</td>
                        <td>$${horas50.toFixed(2)}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Horas 100%</td>
                        <td>${horasTrabajadas}</td>
                        <td>$${horas100.toFixed(2)}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Jubilación</td>
                        <td>-</td>
                        <td>-</td>
                        <td>$${jubilacion.toFixed(2)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Obra Social</td>
                        <td>-</td>
                        <td>-</td>
                        <td>$${obraSocial.toFixed(2)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Ley 23.032</td>
                        <td>-</td>
                        <td>-</td>
                        <td>$${ley23032.toFixed(2)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Asignación Familiar</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>$${asignacionFamiliar.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div class="receipt-subtotals">
                <div>Total Remunerativo: $${totalRemunerativo.toFixed(2)}</div>
                <div>Total Descuento: $${totalDescuento.toFixed(2)}</div>
                <div>Total No Remunerativo: $${totalNoRemunerativo.toFixed(2)}</div>
                <div>Total Neto a Cobrar: $${(salarioTotal - totalDescuento + totalNoRemunerativo).toFixed(2)}</div>
            </div>
        `;
    }
});
