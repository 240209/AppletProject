//
// CHART INPUTS //
//
// carrier signal constants
const carrier_x_values = [];
const carrier_y_values = [];
const carrier_chart = new Chart("carrier_chart", {
    type: "line",
    data: {
        labels: carrier_x_values,
        datasets: [{
            label: "carrier signal",
            fill: false,
            pointStyle: false,
            borderWidth: 2,
            borderColor: "rgba(0, 0, 255, 0.5)",
            data: carrier_y_values
        }]
    },
    options: {
        animation: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Carrier signal',
                color: 'rgb(0, 0, 0)',
                font: { size: 26 }
            },
            legend: { display: false },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "time [ms]"
                },
                ticks: {
                    callback: (index) => {
                        if(index % 20 === 0) return index/20;           // showing only whole milliseconds
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'level [%]'
                }
            }
        }
    }
});

// modulating signal constants
const modulating_x_values = [];
const modulating_y_values = [];
const modulating_chart = new Chart("modulating_chart", {
    type: "line",
    data: {
        labels: modulating_x_values,
        datasets: [{
            label: "modulating signal",
            fill: false,
            pointStyle: false,
            borderWidth: 2,
            borderColor: "rgba(0, 0, 255, 0.5)",
            data: modulating_y_values
        }]
    },
    options: {
        animation: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Modulating signal',
                color: 'rgb(0, 0, 0)',
                font: { size: 26 }
            },
            legend: { display: false },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "time [ms]"
                },
                ticks: {
                    callback: (index) => {
                        if(index % 80 === 0) return index/80;           // showing only whole milliseconds
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'level [%]'
                }
            }
        }
    }
});


//
// CHARTS INITIALIZATION //
//
$(document).ready(() => {
    generateCarrierData();
    generateModulatingData();
    carrier_chart.update('none');
    modulating_chart.update('none');
})


//
// FUNCTION GENERATORS //
//
function generateCarrierData(freq = 500, value = "Math.sin(carrier_arg)", min = 0, max = 10.05, step = 0.05) {
    for (let time = min; time <= max; time += step) {

        let carrier_arg = freq * 2 * Math.PI * time / 1000;

        carrier_y_values.push(eval(value));
        carrier_x_values.push(time);
    }
}

function generateModulatingData(freq = 2500, value = "Math.sin(modulating_arg)", min = 0, max = 10, step = 0.0125) {
    for (let time = min; time <= max; time += step) {

        let modulating_arg = freq * 2 * Math.PI * time / 1000;

        modulating_y_values.push(eval(value));
        modulating_x_values.push(time);
    }
}


//
// INPUT SUBSCRIPTIONS //
//
$("#carrier_frequency_input").on('input', function () {

    let selected_freq = $(this).val();

    // updating chart
    carrier_x_values.length = 0;
    carrier_y_values.length = 0;
    generateCarrierData(selected_freq);
    carrier_chart.update('none');

    // updating selected frequency feedback
    $("#carrier_frequency_output")[0].textContent = selected_freq + " Hz";
});

$("#modulating_frequency_input").on('input', function () {

    let selected_freq = $(this).val();

    // updating chart
    modulating_x_values.length = 0;
    modulating_y_values.length = 0;
    generateModulatingData(selected_freq);
    modulating_chart.update('none');

    // updating selected frequency feedback
    $("#modulating_frequency_output")[0].textContent = selected_freq + " Hz";
});