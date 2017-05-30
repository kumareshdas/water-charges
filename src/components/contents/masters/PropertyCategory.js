import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid,Row,Col,Table } from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {brown500,red500, white} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    errorStyle: {
      color: red500,
    },
    underlineStyle: {
      borderColor: brown500,
    },
    underlineFocusStyle: {
      borderColor: brown500,
    },
    floatingLabelStyle: {
      color: brown500,
    },
    floatingLabelFocusStyle: {
      color: brown500,
    },
};


class PropertyCategory extends Component {

  constructor(props) {
       super(props);
       this.state = {
       }
   }
   componentDidMount()
  {
    let {initForm} = this.props;
    initForm();


  }


    render(){
      let {
        propertyCategory,
        propertyType,
        handleChange,
        fieldErrors,
      }=this.props;
      console.log(propertyCategory);
      return(
        <div className="PropertyCategory">
            <Card>
                <CardHeader
                    title={<strong style={{color:brown500}}>Create Property Category </strong>}
                />
                <CardText>
                      <Card>
                          <CardText>
                              <Grid>

                                  <Row>
                                    <Col xs={12} md={6}>

                                      <SelectField errorText={fieldErrors.propertyType
                                        ? fieldErrors.propertyType
                                        : ""} value={propertyCategory.propertyType?propertyCategory.propertyType:""} onChange={(event, index, value) => {
                                          var e = {
                                            target: {
                                              value: value
                                            }
                                          };
                                          handleChange(e, "propertyType", false, "")}} floatingLabelText="Property Type" >
                                        <MenuItem value={1} primaryText=""/>
                                        <MenuItem value={2} primaryText="Every Night"/>
                                        <MenuItem value={3} primaryText="Weeknights"/>
                                        <MenuItem value={4} primaryText="Weekends"/>
                                        <MenuItem value={5} primaryText="Weekly"/>
                                      </SelectField>

                                    </Col>

                                    <Col xs={12} md={6}>
                                      <SelectField errorText={fieldErrors.categoryType
                                        ? fieldErrors.categoryType
                                        : ""} value={propertyCategory.categoryType?propertyCategory.categoryType:""} onChange={(event, index, value) =>{
                                          var e = {
                                            target: {
                                              value: value
                                            }
                                          };
                                          handleChange(e, "categoryType", false, "")}
                                        } floatingLabelText="Category Type" >
                                        <MenuItem value={1} primaryText=""/>
                                        <MenuItem value={2} primaryText="Every Night"/>
                                        <MenuItem value={3} primaryText="Weeknights"/>
                                        <MenuItem value={4} primaryText="Weekends"/>
                                        <MenuItem value={5} primaryText="Weekly"/>
                                      </SelectField>
                                    </Col>
                                  </Row>
                                  <Row>
                                  <Col xs={12} md={6}>
                                                      <Checkbox
                                                       label="Active"
                                                       errorText={fieldErrors.Active
                                                         ? fieldErrors.Active
                                                         : ""}

                                                       value={propertyCategory.active?propertyCategory.active:""}
                                                       onCheck={(event,isInputChecked) => {
                                                         var e={
                                                           "target":{
                                                             "value":isInputChecked
                                                           }
                                                         }
                                                         handleChange(e, "active", true, "")}
                                                       }
                                                       style={styles.checkbox}
                                                       style={styles.topGap}
                                                      />
                                        </Col>
                                      </Row>

                                </Grid>
                            </CardText>
                            </Card>


                      <div style={{float:"center"}}>
                      <RaisedButton type="submit" label="Create" backgroundColor={brown500} labelColor={white}/>
                      <RaisedButton type="button" label="Close" />
                      </div>
                </CardText>
            </Card>
        </div>
      )
    }

}
const mapStateToProps = state => ({propertyCategory: state.form.form, fieldErrors: state.form.fieldErrors, isFormValid: state.form.isFormValid,isTableShow:state.form.showTable,buttonText:state.form.buttonText});

const mapDispatchToProps = dispatch => ({
  initForm: () => {
    dispatch({
      type: "RESET_STATE",
      validationData: {
        required: {
          current: [],
          required: [ ]
        },

      }
    });
  },
  handleChange: (e, property, isRequired, pattern) => {
    dispatch({type: "HANDLE_CHANGE", property, value: e.target.value, isRequired, pattern});
  }



});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCategory);
