// Define Empty Arrays for Sample Data
var names = []
var metadata = []
var information = []
  
// Import Sample Data from JSON File
d3.json("https://raw.githubusercontent.com/mjknj18/Belly-Button-Biodiversity-Analysis/master/data/samples.json").then(function(data) {
  
  // Create Arrays of Sample Names/MetaData/Information
  data["names"].forEach(item => names.push(item))
  data["metadata"].forEach(item => metadata.push(item))
  data["samples"].forEach(item => information.push(item))

  // Define Variable for HTML Dropdown List
  var dropdown_list = document.getElementById("selDataset")

  // Loop Through Sample Names
  for (var i = 0; i < names.length; i++) {
    
    // Create Option Tag for Each Sample Name & Append to Dropdwown List
    var option = document.createElement("option")
    option.value = names[i]
    option.text = names[i]
    dropdown_list.appendChild(option)}

  // Define Variable for Sample Demographic Information Panel
  var data_panel = document.getElementById("sample-metadata")

  // Loop Through MetaData for All Samples
  for (var i = 0; i < metadata.length; i++) {

    // Set Condition for MetaData from the First Sample
    if (names[0] == metadata[i].id) {

      // Create Paragragh Tag for ID Number & Append to Panel
      var p1 = document.createElement("p")
      var t1 = document.createTextNode("ID Number: " + metadata[i].id)
      p1.appendChild(t1)
      data_panel.appendChild(p1)

      // Create Paragragh Tag for Ethnicity & Append to Panel
      var p2 = document.createElement("p")
      var t2 = document.createTextNode("Ethnicity: " + metadata[i].ethnicity)
      p2.appendChild(t2)
      data_panel.appendChild(p2)

      // Create Paragraph Tag for Gender & Append to Panel
      var p3 = document.createElement("p")
      var t3 = document.createTextNode("Gender: " + metadata[i].gender)
      p3.appendChild(t3)
      data_panel.appendChild(p3)

      // Create Paragraph Tag for Age & Append to Panel
      var p4 = document.createElement("p")
      var t4 = document.createTextNode("Age: " + metadata[i].age)
      p4.appendChild(t4)
      data_panel.appendChild(p4)

      // Create Paragraph Tag for Location & Append to Panel
      var p5 = document.createElement("p")
      var t5 = document.createTextNode("Location: " + metadata[i].location)
      p5.appendChild(t5)
      data_panel.appendChild(p5)

      // Create Paragraph Tag for Bully Button Type & Append to Panel
      var p6 = document.createElement("p")
      var t6 = document.createTextNode("Belly Button Type: " + metadata[i].bbtype)
      p6.appendChild(t6)
      data_panel.appendChild(p6)

      // Create Paragraph Tag for Wash Frequency & Append to Panel
      var p7 = document.createElement("p")
      var t7 = document.createTextNode("Wash Frequency: " + metadata[i].wfreq)
      p7.appendChild(t7)
      data_panel.appendChild(p7)

      // Define Variables for First Sample OTU Bar Graph Data
      var bar_values = information[i].sample_values
      var bar_ids = information[i].otu_ids
      var bar_labels = information[i].otu_labels

      // Create Blank Arrays for Bar Graph Data
      var bar_x = []
      var bar_y = []
      var bar_text = []

      // Set Condition for Ten or Fewer OTU's in the First Sample
      if (bar_ids.length <= 10) {

        // Loop Through All OTU Data for the First Sample
        for (var j = bar_ids.length - 1; j > -1; j--) {
          
          // Append OTU Data to Appropriate Bar Graph Arrays
          bar_x.push(bar_values[j])
          bar_y.push("OTU " + bar_ids[j])
          bar_text.push(bar_labels[j].replace(/;/g, '</br>'))}}
      else {

        // Loop Through First Ten Items of OTU Data for the First Sample
        for (var j = 9; j > -1; j--) {

          // Append OTU Data to Appropriate Bar Graph Arrays with Appropriate Adjustments
          bar_x.push(bar_values[j])
          bar_y.push("OTU " + bar_ids[j])
          bar_text.push(bar_labels[j].replace(/;/g, '</br>'))}}

      // Define Variables for First Sample OTU Bubble Chart Data
      var bubble_x = information[i].otu_ids
      var bubble_y = information[i].sample_values
      var bubble_size = information[i].sample_values
      var bubble_color = information[i].otu_ids
      var bubble_info = information[i].otu_labels
      var bubble_text = []
      
      // Loop Through Bubble Chart OTU Labels
      for (var k = 0; k < bubble_info.length; k++){

        // Append OTU Labels to New Array with Adjustments
        bubble_text.push(bubble_info[k].replace(/;/g, '</br>'))}

      // Define Variable for Washing Frequency Gauge Chart Data
      var gauge_value = metadata[i].wfreq}}

  // Define Array for Bar Chart Data Parameters
  var bar_data = [{
    type: 'bar',
    x: bar_x,
    y: bar_y,
    orientation: 'h',
    mode: 'markers',
    marker: {size: 16},
    text: bar_text}]

  // Define Array for Bar Chart Layout Parameters
  var bar_layout = {
    title: {
      text:'Top OTUs in Sample',
      font: {size: 24}},
    xaxis: {
      title: {
        text: 'OTU Count',
        font: {size: 18}}},
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Bar Chart to HTML Container & Display on Web Page
  Plotly.newPlot('bar', bar_data, bar_layout)

  // Define Array for Bubble Chart Data Parameters
  var bubble_data = [{
    x: bubble_x,
    y: bubble_y,
    text: bubble_text,
    mode: 'markers',
    marker: {
      color: bubble_color,
      size: bubble_size}}]

  // Define Array for Bubble Chart Layout Parameters
  var bubble_layout = {
    title: {
      text:'All OTUs in Sample',
      font: {size: 24}},
    xaxis: {
      title: {
        text: 'OTU ID',
        font: {size: 18}}},
    yaxis: {
      title: {
        text: 'OTU Count',
        font: {size: 18}}},
    autosize: false,
    width: 1250,
    height: 1250,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Bubble Chart to HTML Container & Display on Web Page
  Plotly.newPlot('bubble', bubble_data, bubble_layout)

  // Define Array for Gauge Chart Data Parameters
  var gauge_data = [{
		domain: { x: [0, 1], y: [0, 1] },
		value: gauge_value,
		title: { text: "Sample Washing Frequency", font: { size: 24 }},
		type: "indicator",
    mode: "gauge+number",
    gauge: {axis: {range: [null, 9]}}}]

  // Define Array for Gauge Chart Layout Parameters
  var gauge_layout = {
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Gauge Chart to HTML Container & Display on Web Page
  Plotly.newPlot('gauge', gauge_data, gauge_layout)})

// Define Function for Change in Selected Sample
function optionChanged(value) {

  // Clear HTML Tags in Sample Demographic Information Panel
  document.getElementById('sample-metadata').innerHTML = ""

  // Define Variable for Sample Demographic Information Panel
  var data_panel = document.getElementById("sample-metadata")
  
  // Loop Through MetaData from All Samples
  for (var i = 0; i < metadata.length; i++) {

    // Set Condition for MetaData from the Selected Sample
    if (value == metadata[i].id) {

      // Create Paragragh Tag for ID Number & Append to Panel
      var p1 = document.createElement("p")
      var t1 = document.createTextNode("ID Number: " + metadata[i].id)
      p1.appendChild(t1)
      data_panel.appendChild(p1)

      // Create Paragragh Tag for Ethnicity & Append to Panel
      var p2 = document.createElement("p")
      var t2 = document.createTextNode("Ethnicity: " + metadata[i].ethnicity)
      p2.appendChild(t2)
      data_panel.appendChild(p2)

      // Create Paragraph Tag for Gender & Append to Panel
      var p3 = document.createElement("p")
      var t3 = document.createTextNode("Gender: " + metadata[i].gender)
      p3.appendChild(t3)
      data_panel.appendChild(p3)

      // Create Paragraph Tag for Age & Append to Panel
      var p4 = document.createElement("p")
      var t4 = document.createTextNode("Age: " + metadata[i].age)
      p4.appendChild(t4)
      data_panel.appendChild(p4)

      // Create Paragraph Tag for Location & Append to Panel
      var p5 = document.createElement("p")
      var t5 = document.createTextNode("Location: " + metadata[i].location)
      p5.appendChild(t5)
      data_panel.appendChild(p5)

      // Create Paragraph Tag for Bully Button Type & Append to Panel
      var p6 = document.createElement("p")
      var t6 = document.createTextNode("Belly Button Type: " + metadata[i].bbtype)
      p6.appendChild(t6)
      data_panel.appendChild(p6)

      // Create Paragraph Tag for Wash Frequency & Append to Panel
      var p7 = document.createElement("p")
      var t7 = document.createTextNode("Wash Frequency: " + metadata[i].wfreq)
      p7.appendChild(t7)
      data_panel.appendChild(p7)

      // Define Variables for Selected Sample OTU Bar Graph Data
      var bar_values = information[i].sample_values
      var bar_ids = information[i].otu_ids
      var bar_labels = information[i].otu_labels

      // Create Blank Arrays for Bar Graph Data
      var bar_x = []
      var bar_y = []
      var bar_text = []

      // Set Condition for Ten or Fewer OTU's in the Selected Sample
      if (bar_ids.length <= 10) {
        
        // Loop Through All OTU Data for the Selected Sample
        for (var j = bar_ids.length - 1; j > -1; j--) {
          
          // Append OTU Data to Appropriate Bar Graph Arrays
          bar_x.push(bar_values[j])
          bar_y.push("OTU " + bar_ids[j])
          bar_text.push(bar_labels[j].replace(/;/g, '</br>'))}}
      else {

        // Loop Through First Ten Items of OTU Data for the Selected Sample
        for (var j = 9; j > -1; j--) {

          // Append OTU Data to Appropriate Bar Graph Arrays with Appropriate Adjustments
          bar_x.push(bar_values[j])
          bar_y.push("OTU " + bar_ids[j])
          bar_text.push(bar_labels[j].replace(/;/g, '</br>'))}}

      // Define Variables for Selected Sample OTU Bubble Chart Data
      var bubble_x = information[i].otu_ids
      var bubble_y = information[i].sample_values
      var bubble_size = information[i].sample_values
      var bubble_color = information[i].otu_ids
      var bubble_info = information[i].otu_labels
      var bubble_text = []
      
      // Loop Through Bubble Chart OTU Labels
      for (var k = 0; k < bubble_info.length; k++){

        // Append OTU Labels to New Array with Adjustments
        bubble_text.push(bubble_info[k].replace(/;/g, '</br>'))}

      // Define Variable for Washing Frequency Gauge Chart Data
      var gauge_value = metadata[i].wfreq}}

  // Define Array for Bar Chart Data Parameters
  var bar_data = [{
    type: 'bar',
    x: bar_x,
    y: bar_y,
    orientation: 'h',
    mode: 'markers',
    marker: {size: 16},
    text: bar_text}];

  // Define Array for Bar Chart Layout Parameters
  var bar_layout = {
    title: {
      text:'Top OTUs in Sample',
      font: {size: 24}},
    xaxis: {
      title: {
        text: 'OTU Count',
        font: {size: 18}}},
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Bar Chart to HTML Container & Display on Web Page
  Plotly.newPlot('bar', bar_data, bar_layout)

  // Define Array for Bubble Chart Data Parameters
  var bubble_data = [{
    x: bubble_x,
    y: bubble_y,
    text: bubble_text,
    mode: 'markers',
    marker: {
      color: bubble_color,
      size: bubble_size}}]

  // Define Array for Bubble Chart Layout Parameters
  var bubble_layout = {
    title: {
      text:'All OTUs in Sample',
      font: {size: 24}},
    xaxis: {
      title: {
        text: 'OTU ID',
        font: {size: 18}}},
    yaxis: {
      title: {
        text: 'OTU Count',
        font: {size: 18}}},
    autosize: false,
    width: 1250,
    height: 1250,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Bubble Chart to HTML Container & Display on Web Page
  Plotly.newPlot('bubble', bubble_data, bubble_layout)

  // Define Array for Gauge Chart Data Parameters
  var gauge_data = [{
		domain: {x: [0, 1], y: [0, 1]},
		value: gauge_value,
		title: {text: "Sample Washing Frequency", font: { size: 24}},
		type: "indicator",
    mode: "gauge+number",
    gauge: {axis: {range: [null, 9]}}}]

  // Define Array for Gauge Chart Layout Parameters
  var gauge_layout = {
    autosize: false,
    width: 500,
    height: 500,
    margin: {
      l: 100,
      r: 100,
      b: 100,
      t: 100}}
  
  // Connect Gauge Chart to HTML Container & Display on Web Page
  Plotly.newPlot('gauge', gauge_data, gauge_layout)}