function __init__() {
    var dropdown = d3.select("#selDataset");
 
    d3.json("../samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        console.log(data.names)

        buildPlot(data.names[0]);

    });
}



function buildPlot(id){
    d3.json("../samples.json").then(function(data){
        console.log(data);

        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");


        var importedData = data;
        var metadata = importedData.metadata;
        var samples = importedData.samples;

        var name = samples.filter(val => val.id.toString() === id)[0];
        console.log(name);

        console.log(samples);
        console.log(metadata);

        var sample_val = [];
        var otu_id = [];
        var otu_label = [];
        
        sample_val = name.sample_values.slice(0,10).reverse();
        otu_id = name.otu_ids.slice(0,10).reverse().map(val => `OTU ${val}`);
        otu_label = name.otu_labels.map(row => row.otu_labels);


        console.log(sample_val);
        console.log(otu_id);
        console.log(otu_label);


    
        // Build a bar chart

        var barchart = {
            x: sample_val,
            y: otu_id,
            type: 'bar',
            orientation: 'h',
            text: otu_label
        };

        var data1 = [barchart];

        Plotly.newPlot('bar', data1);

        // Build a bubble chart

        var bubblechart = {
            x: name.otu_ids,
            y: name.sample_values,
            text: name.otu_labels,
            mode: 'markers',
            marker: {
              color: name.otu_ids,
              size: name.sample_values
            }
          };

        var data2 = [bubblechart];

        Plotly.newPlot('bubble', data2);


        var meta_name = metadata.filter(meta => meta.id.toString() === id)[0];
        console.log(meta_name);

        var demo_info = d3.select("#sample-metadata");

        demo_info.html("");

        Object.entries(meta_name).forEach(function(key){
            demo_info.append("h5").text(key[0] + ": " + key[1] + "\n");     
        });
    });
};

function optionChanged(id) {
    buildPlot(id);
}


__init__();