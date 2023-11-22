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
            label: "nosný signál",
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
                text: 'Nosný signál',
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
                    text: "čas [ms]"
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
                    text: 'level'
                }
            }
        }
    }
});
const carrier_chartUpdate = () => {
    carrier_x_values.length = 0;
    carrier_y_values.length = 0;
    generateCarrierData();
    carrier_chart.update('none');
};

// modulating signal constants
const modulating_x_values = [];
const modulating_y_values = [];
const modulating_chart = new Chart("modulating_chart", {
    type: "line",
    data: {
        labels: modulating_x_values,
        datasets: [{
            label: "modulační signál",
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
                text: 'Modulační signál',
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
                    text: "čas [ms]"
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
                    text: 'level'
                }
            }
        }
    }
});
const modulating_chartUpdate = () => {
    modulating_x_values.length = 0;
    modulating_y_values.length = 0;
    generateModulatingData();
    modulating_chart.update('none');
};

// modulated signal constants
const modulated_x_values = [];
const modulated_y_values = [];
const modulated_chart = new Chart("modulated_chart", {
    type: "line",
    data: {
        labels: modulated_x_values,
        datasets: [{
            label: "modulovaný signál",
            fill: false,
            pointStyle: false,
            borderWidth: 2,
            borderColor: "rgba(0, 0, 255, 0.5)",
            data: modulated_y_values
        }]
    },
    options: {
        animation: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Modulovaný signál',
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
                    text: "čas [ms]"
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
                    text: 'level'
                }
            }
        }
    }
});
const modulated_chartUpdate = () => {
    modulated_x_values.length = 0;
    modulated_y_values.length = 0;
    generateModulatedData();
    modulated_chart.update('none');
    spectrum_chartUpdate();
};

// modulated spectrum constants
const spectrum_x_values = [];
const spectrum_y_values = [];
const spectrum_chart = new Chart("spectrum_chart", {
    type: "bar",
    data: {
        labels: spectrum_x_values,
        datasets: [{
            label: "spektrum modulovaného signálu",
            fill: false,
            pointStyle: false,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 255, 0.5)",
            backgroundColor: "rgba(0, 0, 255)",
            data: spectrum_y_values
        }]
    },
    options: {
        barThickness: 2,
        animation: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Spektrum modulovaného signálu',
                color: 'rgb(0, 0, 0)',
                font: { size: 26 }
            },
            legend: { display: false },
        },
        scales: {
            x: {
                display: true,
                type: 'linear',
                beginAtZero: false,
                title: {
                    display: true,
                    text: "frekvence [Hz]"
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'amplituda'
                }
            }
        }
    }
});
// also called by modulated_chartUpdate() function
const spectrum_chartUpdate = () => {
    spectrum_x_values.length = 0;
    spectrum_y_values.length = 0;
    generateSpectrumData();
    spectrum_chart.update('none');
};


//
// CHARTS INITIALIZATION //
//
let modulation_type = "dsb";
$(document).ready(() => {
    carrier_chartUpdate();
    modulating_chartUpdate();
    modulated_chartUpdate();
})


//
// FUNCTION GENERATORS //
//
function generateCarrierData(
    freq = $("#carrier_frequency_input").val(),
    value = "Math.sin(carrier_arg)",
    min = 0, max = 10, step = 0.0125)
{
    for (let time = min; time <= max; time += step) {

        let carrier_arg = freq * 2 * Math.PI * time / 1000;

        carrier_y_values.push(eval(value));
        carrier_x_values.push(time);
    }
}
function generateModulatingData(
    freq = $("#modulating_frequency_input").val(),
    value = "Math.sin(modulating_arg)",
    min = 0, max = 10.05, step = 0.05)
{
    for (let time = min; time <= max; time += step) {

        let modulating_arg = freq * 2 * Math.PI * time / 1000;

        modulating_y_values.push(eval(value));
        modulating_x_values.push(time);
    }
}
function generateModulatedData(
    carr_freq = $("#carrier_frequency_input").val(),
    mod_freq = $("#modulating_frequency_input").val(),
    depth = Number.parseFloat($("#modulation_depth_input").val()),
    min = 0, max = 10, step = 0.0125)
{
    let value;

    // TO DO: correct equations??
    switch (modulation_type)
    {
        case "dsb-sc": value = "1/2 * Math.sin(mod_arg) * Math.sin(carr_arg)"; break;
        case "ssb": value = "depth * Math.sin(carr_arg - mod_arg) + Math.sin(carr_arg)"; break;
        case "ssb-sc": value = "depth * Math.sin(carr_arg - mod_arg)"; break;
        // dsb
        default: value = "(1 + depth * Math.sin(mod_arg)) * Math.sin(carr_arg)";
    }

    for (let time = min; time <= max; time += step) {

        let mod_arg = mod_freq * 2 * Math.PI * time / 1000;
        let carr_arg = carr_freq * 2 * Math.PI * time / 1000;

        modulated_y_values.push(eval(value));
        modulated_x_values.push(time);
    }
}
function generateSpectrumData(
    carr_freq = $("#carrier_frequency_input").val(),
    mod_freq = $("#modulating_frequency_input").val(),
    depth = Number.parseFloat($("#modulation_depth_input").val()))
{
    //default for all
    spectrum_y_values.push(1);
    spectrum_x_values.push(Number(carr_freq) - Number(mod_freq));
    switch (modulation_type)
    {
        case "dsb-sc":          // 1 0 1
        {
            spectrum_y_values.push(1);
            spectrum_x_values.push(Number(carr_freq) + Number(mod_freq));

            break;
        }
        case "ssb":          // 1 1 0
        {
            spectrum_y_values.push(Number(depth));
            spectrum_x_values.push(Number(carr_freq));

            break;
        }
        case "ssb-sc":      // 1 0 0
        {
            break;
        }
        // dsb              // 1 1 1
        default:
        {
            spectrum_y_values.push(Number(depth));
            spectrum_x_values.push(Number(carr_freq));

            spectrum_y_values.push(1);
            spectrum_x_values.push(Number(carr_freq) + Number(mod_freq));

            break;
        }
    }
}


//
// INPUT SUBSCRIPTIONS //
//
$("#carrier_frequency_input").on('input', function () {

    let selected_freq = $(this).val();

    // updating chart
    carrier_chartUpdate();
    modulated_chartUpdate();

    // updating selected frequency feedback
    $("#carrier_frequency_output")[0].textContent = selected_freq + " Hz";
});
$("#modulating_frequency_input").on('input', function () {

    let selected_freq = $(this).val();

    // updating chart
    modulating_chartUpdate();
    modulated_chartUpdate();

    // updating selected frequency feedback
    $("#modulating_frequency_output")[0].textContent = selected_freq + " Hz";
});
$("#modulation_depth_input").on('input', function () {

    let selected_depth = Number.parseFloat($(this).val());

    // updating chart
    modulated_chartUpdate();

    // updating selected modulation depth feedback
    $("#modulation_depth_output")[0].textContent = selected_depth.toFixed(2);
});
$("#modulation_type_input").on('input', function () {

    modulation_type = $(this).val().trim().toLowerCase();

    // updating chart
    modulated_chartUpdate();
});