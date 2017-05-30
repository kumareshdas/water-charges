function getUrlVars() {
   var vars = [],
       hash;
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   for (var i = 0; i < hashes.length; i++) {
       hash = hashes[i].split('=');
       vars.push(hash[0]);
       vars[hash[0]] = hash[1];
   }
   return vars;
}
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Table, DropdownButton} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {brown500, red500,white,orange800} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Api from '../../../api/wCAPIS';


const $ = require('jquery');
$.DataTable = require('datatables.net');
const dt = require('datatables.net-bs');

// const buttons = require('datatables.net-buttons-bs');

require('datatables.net-buttons/js/buttons.colVis.js'); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js'); // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js'); // Flash file export
require('datatables.net-buttons/js/buttons.print.js'); // Print view button

var flag = 0;
const styles = {
  errorStyle: {
    color: red500
  },
  underlineStyle: {
    borderColor: brown500
  },
  underlineFocusStyle: {
    borderColor: brown500
  },
  floatingLabelStyle: {
    color: brown500
  },
  floatingLabelFocusStyle: {
    color: brown500
  },
  customWidth: {
    width:100
  }
};

class PipeSize extends Component {
  constructor(props) {
       super(props);
       this.state = {
         searchBtnText : 'Search'
       }
       this.add=this.add.bind(this);
   }


  componentDidMount()
  {
    let {initForm} = this.props;
    initForm();


  }

  add(e)
  {
    var type=getUrlVars()["type"];
    var id=getUrlVars()["id"];

    // let mode=getUrlVars()["type"];

      let {changeButtonText,pipeSize}=this.props;
      var PipeSize = {
        sizeInMilimeter:pipeSize.sizeInMilimeter,
        sizeInInch:pipeSize.sizeInInch,
        active:pipeSize.active,
        tenantId:'default'
    }
      if(type == "Update"){
        let response=Api.commonApiPost("wcms-masters", "category", "_update/"+id, {},{PipeSize}).then(function(response)
        {
        console.log(response);
      },function(err) {
          alert(err);
      });

      }

    else{
      let response=Api.commonApiPost("wcms-masters", "pipesize", "_create", {},{PipeSize}).then(function(response)
      {
      // console.log(response);
    },function(err) {
        alert(err);
    });
  }
    }




  // componentWillUpdate() {
  //   if(flag == 1) {
  //     flag = 0;
  //     $('#propertyTaxTable').dataTable().fnDestroy();
  //   }
  // }


  render() {
    let {
      pipeSize,
      fieldErrors,
      // isFormValid,
      handleChange,

    } = this.props;
    let {add} = this;
    let mode=getUrlVars()["type"];

    const showActionButton=function() {
      if((!mode) ||mode==="Update")
      {
        // console.log(mode);
        return(<RaisedButton type="submit" label={mode?"Save":"Add"} backgroundColor={brown500} labelColor={white}  onClick={()=> {
                             add("sizeInMilimeter","sizeInInch","active")}} />
        )
      }
    };
     console.log(pipeSize);
        return (
      <div className="pipeSize">
          <Card>
            <CardHeader title={< strong style = {{color:"#5a3e1b"}} > Create Pipe Size Master< /strong>}/>

            <CardText>
              <Card>
                <CardText>
                  <Grid>
                    <Row>
                    <Col xs={12} md={6}>
                      <TextField errorText={fieldErrors.sizeInMilimeter
                        ? fieldErrors.sizeInMilimeter
                        : ""} value={pipeSize.sizeInMilimeter?pipeSize.sizeInMilimeter:""} onChange={(e) =>{ handleChange(e, "sizeInMilimeter", false, "");

                         
                      } } hintText="123456" floatingLabelText="H.S.C Pipe Size (mm)" />
                    </Col>

                    <Col xs={12} md={6}>
                      <TextField  disabled={true} errorText={fieldErrors.sizeInInch
                        ? fieldErrors.sizeInInch
                        : ""} value={pipeSize.sizeInMilimeter?pipeSize.sizeInMilimeter*0.039:""} onChange={(e) => handleChange(e, "sizeInInch", false, "")}  floatingLabelText="H.S.C Pipe Size (inch)" />
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={12} md={6}>
                                        <Checkbox
                                         label="Active"
                                         defaultChecked={true}
                                         value={pipeSize.Active?pipeSize.Active:""}
                                         onCheck={(event,isInputChecked) => {
                                           var e={
                                             "target":{
                                               "value":isInputChecked
                                             }
                                           }
                                           handleChange(e, "Active", false, "")}
                                         }
                                         style={styles.checkbox}
                                         style={styles.topGap}
                                        />
                          </Col>
                        </Row>

                    </Grid>
                  </CardText>
              </Card>





              <div style={{
                float: "center"
              }}>


              {showActionButton()}
              <RaisedButton label="Close"/>
              </div>
            </CardText>
          </Card>






      </div>
    );
  }
}

const mapStateToProps = state => ({pipeSize: state.form.form, fieldErrors: state.form.fieldErrors, isFormValid: state.form.isFormValid,buttonText:state.form.buttonText});

const mapDispatchToProps = dispatch => ({
  initForm: () => {
    dispatch({
      type: "RESET_STATE",
      validationData: {
        required: {
          current: [],
          required: [ ]
        },
        pattern: {
          current: [],
          required: ["sizeInMilimeter"]
        }
      }
    });
  },
  handleChange: (e, property, isRequired, pattern) => {
    dispatch({type: "HANDLE_CHANGE", property, value: e.target.value, isRequired, pattern});
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(PipeSize);
