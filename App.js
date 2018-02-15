import React, { Component } from 'react';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';


export default class ToDo extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: null,
      data: [], 
      DataText:null,
      DataHolder: null,
    }
  }

  DatePickerMainFunctionCall = () => {
    this.refs.DatePickerDialog.open({
      date: new Date(),
      
    });
 
  }

onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    }, () => this.addNewTask());
  }

  addNewTask= () =>{
    const data = this.state.data;
    data.push({data:this.state.text,
               date:this.state.DateText});
    //alert(data);
    this.setState({
      data: data,
      text: null,
      DataText: null,
    });
  }
  deleteTask(item){
    const data = this.state.data;
    const index = data.indexOf(item);
    data.splice(index, 1);
    this.setState({
      data: data
    });
  }
  
  render() {
    const { data, text, DataText } = this.state;
    // <FlatList 
    //       data={data}
    //       renderItem={({item}) => 
    //       <TaskItem 
    //         onDelete={(item) => this.deleteTask(item)} 
    //         item={item} 
    //       />}
    //       extraData={this.state}
    //     />
    return (
      <View style={styles.container}>
      <TextInput 
      //  onChangeText={(text) => this.setState({ text })}
       onChangeText={(text) => this.setState({ text })}
        onSubmitEditing={() => this.DatePickerMainFunctionCall()}
        style={{ margin: 10 }}
        placeholder="Tambah Data"
        value={text}
        />
        <ScrollView>
        {
          data.map(item => {
            return (
              <TaskItem 
                onDelete={(item) => this.deleteTask(item)} 
                item={item} 
              />);
          })
        }
         <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
        </ScrollView>  
      </View>
    );
  }
}

class TaskItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    
    }
  }  
  check(){
    this.setState({
      checked: !this.state.checked
    })
  }
  render(){
    const { checked } = this.state;
    const { item, onDelete } = this.props;
    return (
      <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
        <TouchableOpacity style={{ flex: 0.1 }} onPress={() => this.check()}>
          <Image source={ checked ? require('./check-sign-in-a-rounded-black-square.png') : require('./check-box-empty.png') } />
        </TouchableOpacity>
        <Text style={{ flex: 1, paddingTop: 5, textDecorationLine: checked ? 'line-through' : '' }}>{item.data}</Text>
        <Text style={{ flex: 0, paddingTop: 5, textDecorationLine: checked ? 'line-through' : '' }}>{item.date}</Text>   
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Image source={ require('./delete.png') }/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#ecf0f1',
  },
  datePickerText: {

  }
});
