//Variables

//Selects de búsqueda
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const precio = document.querySelector('#precio');
const color = document.querySelector('#color');

//contenedor resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 12;

//Generar un objeto con los parámetros de búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',

}


//Eventos

document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);

    llenarSelectAnios();
})

marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})


//Funciones

function mostrarAutos(autos) {
    limpiarHTML(resultado);
    autos.forEach(auto => {
        //Extraer variables usando destructuring
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        //Crear elemento e insertarloe en el div
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - ${transmision} - ${precio} - ${color}
        `;
        resultado.appendChild(autoHTML);
    });
}

//Limpiar HTML

function limpiarHTML(elemento) {
    while(elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

//Generar años del select

function llenarSelectAnios() {

    for( let i=max; i>=min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(precioMinimo).filter(precioMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(resultado);

    if(resultado.length){
        mostrarAutos(resultado);
    }else {
        noResultado();
    }
}

function filtrarMarca(auto){

    const {marca} = datosBusqueda;

    if(marca){
        return auto.marca === marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto){

    const {year} = datosBusqueda;

    if(year){
        return auto.year == year;
    } else {
        return auto;
    }
}

function precioMinimo(auto){
    const {minimo} = datosBusqueda;

    if(minimo){
        return auto.precio >= minimo;
    } else {
        return auto;
    }
}

function precioMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    } else {
        return auto;
    }
}

function filtrarPuertas(auto){

    const {puertas} = datosBusqueda;

    if(puertas){
        return auto.puertas == puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto){

    const {transmision} = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision;
    } else {
        return auto;
    }
}

function filtrarColor(auto){

    const {color} = datosBusqueda;

    if(color){
        return auto.color === color;
    } else {
        return auto;
    }
}

function noResultado() {
    limpiarHTML(resultado);
    const sinResultado = document.createElement('div');
    sinResultado.classList.add('alerta', 'error');
    sinResultado.textContent = 'Sin resultados';
    resultado.appendChild(sinResultado);
}