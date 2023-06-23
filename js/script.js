/*
sources:  https://jqueryvalidation.org/validate/
          https://jqueryvalidation.org/jQuery.validator.addMethod/
          https://jqueryvalidation.org/category/methods/
          https://api.jqueryui.com/slider/
          https://www.w3schools.com/jquery/event_keyup.asp
          https://api.jqueryui.com/tabs/#option-active
          https://www.w3schools.com/jsref/met_node_clonenode.asp
*/
// hide the table until the user makes their first one
$('#table').hide();
// makes sure that the tabs aren't collapsible because its confusing if they are
$('#coltable').tabs({collapsible: false});
// These are some globals I needed to use throughout the program
// They are mainly iterators and checking if all input is valid before generating the first table
// or showing errors
var minCClicked = false;
var maxCClicked = false;
var minRClicked = false;
var maxRClicked = false;
var tabIterator = 1;
var tNum = 1;
var checkIterator = 1;
// This is just a simple function that checks if everything is entered before submitting the form
// otherwise I was getting the jquery validation error that the input boxes needed something entered in the field
function submitForm(input){
  if(minCClicked && maxCClicked && minRClicked && maxRClicked){
    $("#form").submit();
  }

}
// function to get all the values in the input.
// returns an object with key values that hold arrays of the actual values and the element itself
function getInputValues(){
  var minColElement = document.getElementById("minc");
  var minColVal = parseInt(document.getElementById("minc").value);
  var maxColElement = document.getElementById("maxc");
  var maxColVal = parseInt(document.getElementById("maxc").value);
  var minRowElement = document.getElementById("minr");
  var minRowVal = parseInt(document.getElementById("minr").value);
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = parseInt(document.getElementById("maxr").value);
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};           
  return input;
}
// function generates the table via vanilla javascript (from HW3)
// I had to update it slightly to make it work with this assignment
function generateTable(input){
  // creates new HTML table
  var table = document.getElementById("table");
  table.remove();

  var tableParentDiv = document.getElementById("coltable");
  var newTable = document.createElement("table");
  newTable.id = "table";
  tableParentDiv.appendChild(newTable);
  var newThead = document.createElement("thead");
  var newTbody = document.createElement("tbody");
  newTable.appendChild(newThead);
  newTable.appendChild(newTbody);
  var newTr = document.createElement("tr");
  newThead.appendChild(newTr);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var tHeadtBodyPair = document.getElementById("table").children;
  var tHead = tHeadtBodyPair[0];
  var trCollection = tHead.children;
  var tableColHeaders = trCollection[0].children;
  tableColHeaders[1].innerHTML = input.minCol[0];
  // populating the top row/column headers
  for(var i = input.minCol[0] + 1; i <= input.maxCol[0]; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
  //populating each row after the top row
  // this for loop creates a new row element
  // and then the inner for-loop populates the rest of that row 
  for(var j = input.minRow[0]; j <= input.maxRow[0]; j++) {
    var newTr = document.createElement("tr");
    tHeadtBodyPair[1].appendChild(newTr);
    var lastTr = tHeadtBodyPair[1].lastElementChild;
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(j);
    newTh.appendChild(textNode);
    lastTr.appendChild(newTh);
    for(var x = input.minCol[0]; x <= input.maxCol[0]; x++) {
      var newTd = document.createElement("td");
      var textNode = document.createTextNode(x * j);
      newTd.appendChild(textNode);
      lastTr.appendChild(newTd);
    }
  }  
  $("div#maintab").html(newTable);
  $("a#maina").html("C[" + input.minCol[0] + ", " + input.maxCol[0] + "] R[" + input.minRow[0] + ", " + input.maxRow[0] + "]");
  return newTable;
}
/*main jquery code*/ 
$(document).ready(function(){
  // jquery validation plugin
  $("#form").validate({
    rules: {
      minc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        onlyIntegers: true
        
      },
      maxc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxcIsLargest: true,
        onlyIntegers: true
      },
      minr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        onlyIntegers: true
      },
      maxr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxrIsLargest: true,
        onlyIntegers: true
      }
    },
    submitHandler: function(){
      var input = getInputValues(); 
      generateTable(input);
    }
  });
  /*
  code for sliders
  They had each be their own variable or else it was effecting the input of others
*/

  //minimum column slider
  var minCSlider = {
    min: -51,
    max: 51,
    value: 0,
    animate: "slow",
    slide: function() {
      $("#coltable").tabs("option", "active", 0);
      var input = getInputValues();
      // gets the value from the slider and stores it in the input variable for minimum column value
      // then sets that value in the input element for minimum column      
      input.minCol[0] = $("#minCSlider").slider("value");
      $("#minc").val(input.minCol[0]);
      minCClicked = true;      
      submitForm(input);   
    }
  };
  // maximum column slider
  var maxCSlider = {
    min: -51,
    max: 51,
    value: 0,
    slide: function() {
      $("#coltable").tabs("option", "active", 0);
      var input = getInputValues();
      input.maxCol[0] = $("#maxCSlider").slider("value");
      $("#maxc").val(input.maxCol[0]);
      maxCClicked = true;
      submitForm(input);   
    }
  }
  // minimum row slider
  var minRSlider = {
    min: -51,
    max: 51,
    value: 0,
    slide: function() {
      $("#coltable").tabs("option", "active", 0);
      var input = getInputValues();
      input.minRow[0] = $("#minRSlider").slider("value");
      $("#minr").val(input.minRow[0]);
      minRClicked = true;
      submitForm(input);   
    }
  }
  // maximum row slider
  var maxRSlider = {
    min: -51,
    max: 51,
    value: 0,
    slide: function() {
      $("#coltable").tabs("option", "active", 0);
      var input = getInputValues();
      input.maxRow[0] = $("#maxRSlider").slider("value");
      $("#maxr").val(input.maxRow[0]);
      maxRClicked = true;
      submitForm(input);   
    }

  }
  
/*
  updating the each of the sliders dynamically depending on the number typed in the input box
  when slider keyup() event happens, the active tab is set to the main first tab.
*/
//minimum column slider
  $("#minc").keyup(function(){
    $("#coltable").tabs("option", "active", 0);
    var input = getInputValues();    
    $("#minCSlider").slider("option", "value", input.minCol[0]);    
    if(isNaN(input.minCol[0])){
      $("#minCSlider").slider("option", "value", 0);
    }    
    minCClicked = true;
    submitForm(input);
  });
//maximum column slider
  $("#maxc").keyup(function(){
    $("#coltable").tabs("option", "active", 0);
    var input = getInputValues();
    $("#maxCSlider").slider("option", "value", input.maxCol[0]);
    if(isNaN(input.maxCol[0])){
      $("#maxCSlider").slider("option", "value", 0);
    }
    maxCClicked = true;
    submitForm(input);
  });
//minimum row slider
  $("#minr").keyup(function(){
    $("#coltable").tabs("option", "active", 0);
    var input = getInputValues();
    $("#minRSlider").slider("option", "value", input.minRow[0]);
    if(isNaN(input.minRow[0])){
      $("#minRSlider").slider("option", "value", 0);
    }
    minRClicked = true;
    submitForm(input);
  });
//maximum row slider
  $("#maxr").keyup(function(){
    $("#coltable").tabs("option", "active", 0);
    var input = getInputValues();
    $("#maxRSlider").slider("option", "value", input.maxRow[0]);
    if(isNaN(input.maxRow[0])){
      $("#maxRSlider").slider("option", "value", 0);
    }
    maxRClicked = true;
    submitForm(input);
  });
  $("#minCSlider").slider(minCSlider); 
  $("#maxCSlider").slider(maxCSlider);
  $("#minRSlider").slider(minRSlider);
  $("#maxRSlider").slider(maxRSlider);
  // user defined methods used for fields in the validation
  // The two methods are making sure that the min column or row is smaller than the max column or row
  $.validator.addMethod("maxcIsLargest", function(value){
    var input = getInputValues();
    return input.minCol[0] <= value;
  }, "ERROR: The maximum column value must be greater than or equal to minimum column. Please make sure the maximum is always greater than or equal to minumum.");
  $.validator.addMethod("maxrIsLargest", function(value){
    var input = getInputValues();
    return input.minRow[0] <= value;
  }, "ERROR: The maximum row must be greater than or qual to  minimum row. Please make sure the maximum is always greater than or equal to minumum.");
  // method to ensure that only integers are entered as a value
  $.validator.addMethod("onlyIntegers", function(value){
    return !(value.includes('.'));
  }, "INVALID ENTRY: No number was entered. Please enter a number between -50 and 50.");
  // this checks the checkboxes if they have been checked,
  // iterates through the list of current divs and deletes the
  // ones that were checked along with their corresponding li elements
  $("#btn-delete").tabs().on("click", function(){
    var tabsChildren = $("#coltable").contents().filter("div");    
    var n = parseInt($(tabsChildren[tabsChildren.length -1]).attr("id").substring(4));
    for(let i = 1; i < n + 1; i++){
      if( ($("#check" + parseInt(i)).is(":checked")) ){        
        $("#tab-" + i).remove();       
        $("#li" + i).remove();         
        $("#coltable").tabs("refresh");
        $("#coltable").tabs("option", "active", 0);
      }
    }
    $("#coltable").tabs("refresh");
  });
  // when the submit button is clicked, it saves the current table into a new tab
  $("#submit").on("click", function(){
    if($("#form").valid()){
      var input = getInputValues();      
      let savedTable = generateTable(input);
      // makes a clone of that HTML table into the saveTable variable to display in a new tab.
      // otherwise it was changing the original table in the main first tab
      savedTable = savedTable.cloneNode(true);
      // declaring some strings needed as element ids
      savedTable.id = "t" + tNum;
      tNum++;
      var tabNum = "#tab-" + tabIterator;
      var tabNum1 = "tab-" + tabIterator;
      var checkID = "check" + parseInt(checkIterator);
      var liID = "li" + parseInt(checkIterator);
    // putting together new li and div elements to append to the main div when a new tab is created
      var newLi = $("<li id='" + liID + "'><a href=" + "'" + tabNum + "'" + ">C[" + input.minCol[0] + ", " + input.maxCol[0] + "] R[" + input.minRow[0] + ", " + input.maxRow[0] + "]</a><input type='checkbox' id='" + checkID + "'></input></li>");
      $(newLi).appendTo("ul");
      var newDiv = $("<div id=" + "'" + tabNum1 + "'" + "></div>");
      $(newDiv).appendTo("div#coltable");
      $(newDiv).html(savedTable);
      // after new table appended, refresh the tabs and set active ones
      $("#coltable").tabs("refresh");
      $("#coltable").tabs("option", "active", parseInt(tabIterator) - 1);
      if(parseInt($("#coltable").contents().filter("div").length) === 1){
        $("#coltable").tabs("option", "active", 0);
      }
      tabIterator++;
      checkIterator++;
    }
  });
 
   // Function to clear the multiplication table and set "Current Tab" as active
   function clearTable() {
    // Remove the table elements
    //$('#coltable ul li').remove();
    //$('#coltable div').remove();

    // Set "Current Tab" as active
    $('#maina').click();

    // Reset any other necessary state variables or perform additional actions
  }

  // Clear button
  $('#clear-btn').click(function() {
    // Reset form validation
    $("#form").validate().resetForm();

    // Clear input fields
    $('#minc').val('');
    $('#maxc').val('');
    $('#minr').val('');
    $('#maxr').val('');

    // Reset slider values
    $("#minCSlider").slider("value", 0);
    $("#maxCSlider").slider("value", 0);
    $("#minRSlider").slider("value", 0);
    $("#maxRSlider").slider("value", 0);

    // Clear the multiplication table and set "Current Tab" as active
    clearTable();

    // Reset any other necessary state variables or perform additional actions

    // Return false to prevent default form submission
    return false;
  });
});
