import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 20,
    marginBottom: 25,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const names = [
  'Pizza Hut',
  'Papa John\'s Pizza',
  'Papa Murphy\'s',
  'Domino\'s Pizza',
  'A&W Restaurants',
  'Chipotle Mexican Grill',
  'Tim Hortons',
  'McDonald\'s',
];

function App() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dropdown, setDropdown] = React.useState('');
  const [dataArray, setDataArray] = React.useState([]);

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFile = (event) => {

    let lineArray = [];
    const fileList = event.target.files;
    var file = fileList[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent){

      // By lines
      var lines = this.result.split('\n');

      lineArray = removeSpace(lines);
      console.log(lineArray);
      setDataArray(lineArray);
      splitToArray(lineArray);

      return lineArray;
    };
    reader.readAsText(file);
  }

  const removeSpace = (lineArray) => {
    var tmpLineArray = [];
    var beforeSpace = "";
    for(var i=0; i<lineArray.length; i++){
      beforeSpace = lineArray[i].replace(/\s/g, '');
      tmpLineArray.push(beforeSpace);
    }
    return tmpLineArray;

  }

  const splitToArray = (lineArray) => {

    var tempPercent = 0;
    var result = '';

    for (var i=0; i < names.length; i++ ){
      for(var j =0; j < lineArray.length; j++) {
        if(tempPercent < similarity(names[i], lineArray[j]) ) {
          tempPercent = similarity(names[i], lineArray[j])
          result = names[i]
        }
      }

    }
    console.log("Result --;) "+ result);
    setDropdown(result)
  }





//string similarity custom

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }
  
  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color: "red", textAlign:"center"}}>
          Ledgers Test
        </h1>
        
      </header>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Restaurant</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={dropdown}
          onChange={handleChange}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

      <form>
        <label style={{marginLeft: "20px", marginTop:"20px"}}>
          Select Receipt: 
          <input type="file" name="name" onChange={handleFile}/>
        </label>
        
      </form>
      
    </div>
  );
}

export default App;
