import {data} from "./data.js"

class DataByCause{
    data = []

    constructor(color, colorHex){
        this.color = color
        this.colorHex = colorHex
    }

    addData(row){
        this.data.push(row)
    }

    addMarkers(markers){
        this.data.forEach(row => {
            let d = new Date(row.event_date)
            const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
            const cause = row.landslide_trigger.charAt(0).toUpperCase() + row.landslide_trigger.slice(1)
            const impact = row.landslide_size.charAt(0).toUpperCase() + row.landslide_size.slice(1)
    
            let description = `Date : ${date} <br>Cause : ${cause}<br>Impact : ${impact}`
            if(row.fatality_count) description += `<br>Fatality : ${row.fatality_count}`
            if(row.injury_count) description += `<br>Injury : ${row.injury_count}`
            if(row.location_accuracy != "unknown") description += `<br>Location Accuracy : ${row.location_accuracy}`
            const myMarker = L.ExtraMarkers.icon({
                markerColor: this.color,
                shape: 'circle',
                prefix: 'fa'
            });
            const marker = L.marker([row.latitude, row.longitude], {icon: myMarker}).bindPopup(description)
            markers.addLayer(marker)
        })
    }

    giveMarkers(){
        return this.markers
    }
}

function loadMap(){
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    return map
}

async function loadStates(map, fileName) {
        
    function style() {
        return {
            fillColor: '#ff780000',
            weight: 1,
            opacity: 1,
            color: '#555',
            dashArray: '3',
            fillOpacity: 7
        };
    }

    function zoomToState(e) {
        map.fitBounds(e.target.getBounds());
    }

    const response = await fetch(fileName)
    const geoJsonData = await response.json()

    L.geoJSON(geoJsonData, {
        style: style,
        onEachFeature: (feature, layer) => {
            layer.on({
                click: zoomToState
            });
        }
    }).addTo(map);
}

function prepareDataForMap(data){

    const dataForMap = {
        continuous_rain: new DataByCause("orange-dark","#D43019"),
        rain: new DataByCause("orange","#ED8318"),
        downpour: new DataByCause("green","#009447"),
        unknown: new DataByCause("black","#221E1F"),
        construction: new DataByCause("red","#981F21"),
        monsoon: new DataByCause("violet","#841782"),
        mining: new DataByCause("purple","#553366"),
        snowfall_snowmelt: new DataByCause("green_light","#9C272C"),
        tropical_cyclone: new DataByCause("blue-dark","#185567"),
        other: new DataByCause("yellow","#F4B52A"),
        flooding: new DataByCause("cyan","#1E9ED9"),
        leaking_pipe: new DataByCause("pink","#B94496"),
    }
    data.forEach(row => {
        dataForMap[row.landslide_trigger].addData(row)
    })
    return dataForMap    
}

function loadMarkers(map, markers, dataForMap){
    map.removeLayer(markers)
    markers.clearLayers()
    const keyElement = document.getElementById("key")
    for (let i = 1; i < keyElement.children.length; i++) {
        const checkboxElement = keyElement.children[i].children[0];
        if(checkboxElement.checked){
            dataForMap[checkboxElement.name].addMarkers(markers)
        }
    }
    map.addLayer(markers)
}

function addEventOnCheckBox(map, markers, dataForMap){
    const checkBoxes = document.getElementsByClassName("key-checkbox")
    for (let i = 0; i < checkBoxes.length; i++) {
        const checkBox = checkBoxes[i]
        checkBox.addEventListener("click", e => {
            loadMarkers(map, markers, dataForMap)
        })
    }
}

function addEventOnClearAllBtn(map, markers, dataForMap){
    const clearAllBtn = document.getElementById("clear-btn")
    const checkBoxes = document.getElementsByClassName("key-checkbox")
    clearAllBtn.addEventListener("click", e => {
        for (let i = 0; i < checkBoxes.length; i++) {
            const checkBox = checkBoxes[i]
            checkBox.checked = false
            loadMarkers(map, markers, dataForMap)
        }
    })
}

function addEventOnApplyAllBtn(map, markers, dataForMap){
    const clearAllBtn = document.getElementById("apply-btn")
    const checkBoxes = document.getElementsByClassName("key-checkbox")
    clearAllBtn.addEventListener("click", e => {
        for (let i = 0; i < checkBoxes.length; i++) {
            const checkBox = checkBoxes[i]
            checkBox.checked = true
            loadMarkers(map, markers, dataForMap)
        }
    })
}

async function main(){
    const markers = L.markerClusterGroup()
    const dataForMap = prepareDataForMap(data)

    const map = loadMap()
    await loadStates(map, "./archive/india_state_geo.json")
    loadMarkers(map, markers, dataForMap)
    addEventOnCheckBox(map, markers, dataForMap)
    addEventOnClearAllBtn(map, markers, dataForMap)
    addEventOnApplyAllBtn(map, markers, dataForMap)
}

main()

