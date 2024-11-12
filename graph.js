import {data} from "./data.js"

let myChartInstance

const optionsY = {
    "Trigger": ["Landslides", "Fatalities", "Injuries"],
    "State": ["Landslides", "Fatalities", "Injuries"],
    "Size": ["Landslides", "Fatalities", "Injuries"],
    "Year": ["Landslides", "Fatalities", "Injuries"],
    "Month": ["Landslides", "Fatalities", "Injuries"],
    "Landslides": ["Trigger", "State", "Size", "Year", "Month"],
    "Injuries": ["Trigger", "State", "Size", "Year", "Month"],
    "Fatalities": ["Trigger", "State", "Size", "Year", "Month"],
}

function addEventToXAxisOptions(){
    const selectElementX = document.getElementById("x-axis-select");

    selectElementX.addEventListener("change", e => {
        const selectedOptionX = selectElementX.options[selectElementX.selectedIndex].value;
        const selectElementY = document.getElementById("y-axis-select");
        selectElementY.innerHTML = ""
        optionsY[selectedOptionX].forEach(option => {
            selectElementY.innerHTML += `<option class="y-axis-options" value="${option}">${option}</option>`
        })
    })
}

function addEventToFormSubmit(){
    const submitBtn = document.getElementById("sumbit-btn")
    submitBtn.addEventListener("click", e => {
        const selectElementX = document.getElementById("x-axis-select");
        const selectElementY = document.getElementById("y-axis-select");
        const radioButtonBar = document.getElementById("bar_graph")
        const selectedOptionX = selectElementX.options[selectElementX.selectedIndex].value;
        const selectedOptionY = selectElementY.options[selectElementY.selectedIndex].value;
        let type = "line"
        if(radioButtonBar.checked) type = "bar"
        plotGraph(selectedOptionX, selectedOptionY, type)
    })
}

function generateBarChar(xData, yData, label, indexAxis, type){
    const ctx = document.getElementById('myChart');
    ctx.innerHTML = ""
    if (myChartInstance) {
        myChartInstance.destroy();
    }
    myChartInstance = new Chart(ctx, {
        type: type.toLowerCase(),
        data: {
            labels: xData,
            datasets: [{
                label: label,
                data: yData,
                borderWidth: 3,
                backgroundColor: 'rgba(109, 40, 217, 0.7)',
                borderColor: 'rgba(109, 40, 217, 1)',
                color: '#000'
            }]
        },
        options: {
            indexAxis: indexAxis, 
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                        color: '#000000'
                    }
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                        color: '#000000'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 20,
                            family: "Montserrat",
                            style: "bold",
                        }
                    }
                }
            },
            animations: {
                tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
                }
            }
        }
    });
}

// TRIGGER
function triggerToLandslides(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        const key = row.landslide_trigger
        if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+1)
        else hashmap.set(key, 1)
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Landslides", indexAxis, type)
}

function triggerToFatalities(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.fatality_count){
            const key = row.landslide_trigger
            const value = Number(row.fatality_count)
            if(value > 4000) return
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Fatalities", indexAxis, type)
}

function triggerToInjuries(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.injury_count){
            const key = row.landslide_trigger
            const value = Number(row.injury_count)
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Injuries", indexAxis, type)
}

// STATE
function stateToLandslides(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        const key = row.admin_division_name
        if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+1)
        else hashmap.set(key, 1)
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Landslides", indexAxis, type)
}

function stateToFatalities(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.fatality_count){
            const key = row.admin_division_name
            const value = Number(row.fatality_count)
            if(value > 4000) return
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Fatalities", indexAxis, type)
}

function stateToInjuries(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.injury_count){
            const key = row.admin_division_name
            const value = Number(row.injury_count)
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Injuries", indexAxis, type)
}

// SIZE
function sizeToLandslides(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        const key = row.landslide_size
        if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+1)
        else hashmap.set(key, 1)
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Landslides", indexAxis, type)
}

function sizeToFatalities(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.fatality_count){
            const key = row.landslide_size
            const value = Number(row.fatality_count)
            if(value > 4000) return
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Fatalities", indexAxis, type)
}

function sizeToInjuries(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.injury_count){
            const key = row.landslide_size
            const value = Number(row.injury_count)
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    generateBarChar(Array.from(hashmap.keys()), Array.from(hashmap.values()), "# of Injuries", indexAxis, type)
}


// YEAR
function yearToLandslides(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        const d = new Date(row.event_date)
        const key = d.getFullYear()
        if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+1)
        else hashmap.set(key, 1)        
    })
    hashmap.delete(NaN)

    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Landslides", indexAxis, type)
}

function yearToFatalities(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.fatality_count){
            const d = new Date(row.event_date)
            const key = d.getFullYear()
            const value = Number(row.fatality_count)
            if(value > 4000) return
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Fatalities", indexAxis, type)
}

function yearToInjuries(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.injury_count){
            const d = new Date(row.event_date)
            const key = d.getFullYear()
            const value = Number(row.injury_count)
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Injuries", indexAxis, type)
}

// MONTH
function monthToLandslides(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        const d = new Date(row.event_date)
        const key = d.getMonth()+1
        if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+1)
        else hashmap.set(key, 1)        
    })
    hashmap.delete(NaN)

    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Landslides", indexAxis, type)
}

function monthToFatalities(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.fatality_count){
            const d = new Date(row.event_date)
            const key = d.getMonth() + 1
            const value = Number(row.fatality_count)
            if(value > 4000) return
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Fatalities", indexAxis, type)
}

function monthToInjuries(indexAxis, type){
    const hashmap = new Map()
    data.forEach(row => {
        if(row.injury_count){
            const d = new Date(row.event_date)
            const key = d.getMonth() + 1
            const value = Number(row.injury_count)
            if(hashmap.has(key)) hashmap.set(key, hashmap.get(key)+value)
            else hashmap.set(key, value)
        }
    })
    const sortedByKey = new Map(Array.from(hashmap.entries()).sort((a, b) => a[0] - b[0]))
    generateBarChar(Array.from(sortedByKey.keys()), Array.from(sortedByKey.values()), "# of Injuries", indexAxis, type)
}

function plotGraph(selectedOptionX, selectedOptionY, type){
    console.log(selectedOptionX, selectedOptionY);
    if(selectedOptionX == "Trigger" && selectedOptionY == "Landslides") triggerToLandslides('x', type)
        else if(selectedOptionY == "Trigger" && selectedOptionX == "Landslides") triggerToLandslides('y', type)
    else if(selectedOptionX == "Trigger" && selectedOptionY == "Fatalities") triggerToFatalities('x', type)
        else if(selectedOptionY == "Trigger" && selectedOptionX == "Fatalities") triggerToFatalities('y', type)
    else if(selectedOptionX == "Trigger" && selectedOptionY == "Injuries") triggerToInjuries('x', type)
        else if(selectedOptionY == "Trigger" && selectedOptionX == "Injuries") triggerToInjuries('y', type)
    
    else if(selectedOptionX == "State" && selectedOptionY == "Landslides") stateToLandslides('x', type)
        else if(selectedOptionY == "State" && selectedOptionX == "Landslides") stateToLandslides('y', type)
    else if(selectedOptionX == "State" && selectedOptionY == "Fatalities") stateToFatalities('x', type)
        else if(selectedOptionY == "State" && selectedOptionX == "Fatalities") stateToFatalities('y', type)
    else if(selectedOptionX == "State" && selectedOptionY == "Injuries") stateToInjuries('x', type)
        else if(selectedOptionY == "State" && selectedOptionX == "Injuries") stateToInjuries('y', type)

    else if(selectedOptionX == "Size" && selectedOptionY == "Landslides") sizeToLandslides('x', type)
        else if(selectedOptionY == "Size" && selectedOptionX == "Landslides") sizeToLandslides('y', type)
    else if(selectedOptionX == "Size" && selectedOptionY == "Fatalities") sizeToFatalities('x', type)
        else if(selectedOptionY == "Size" && selectedOptionX == "Fatalities") sizeToFatalities('y', type)
    else if(selectedOptionX == "Size" && selectedOptionY == "Injuries") sizeToInjuries('x', type)
        else if(selectedOptionY == "Size" && selectedOptionX == "Injuries") sizeToInjuries('y', type)

    else if(selectedOptionX == "Year" && selectedOptionY == "Landslides") yearToLandslides('x', type)
        else if(selectedOptionY == "Year" && selectedOptionX == "Landslides") yearToLandslides('y', type)
    else if(selectedOptionX == "Year" && selectedOptionY == "Fatalities") yearToFatalities('x', type)
        else if(selectedOptionY == "Year" && selectedOptionX == "Fatalities") yearToFatalities('y', type)
    else if(selectedOptionX == "Year" && selectedOptionY == "Injuries") yearToInjuries('x', type)
        else if(selectedOptionY == "Year" && selectedOptionX == "Injuries") yearToInjuries('y', type)


    else if(selectedOptionX == "Month" && selectedOptionY == "Landslides") monthToLandslides('x', type)
        else if(selectedOptionY == "Month" && selectedOptionX == "Landslides") monthToLandslides('y', type)
    else if(selectedOptionX == "Month" && selectedOptionY == "Fatalities") monthToFatalities('x', type)
        else if(selectedOptionY == "Month" && selectedOptionX == "Fatalities") monthToFatalities('y', type)
    else if(selectedOptionX == "Month" && selectedOptionY == "Injuries") monthToInjuries('x', type)
        else if(selectedOptionY == "Month" && selectedOptionX == "Injuries") monthToInjuries('y', type)
}

function main(){
    addEventToXAxisOptions()
    addEventToFormSubmit()
}

main()

