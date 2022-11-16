import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Question from './Question';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      count: 0,
      mainTicketList: [],
      selectedTicket: null,
      editing: false 
    };
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
  }

  handleClick = () => {
    this.setState({count: this.state.count + 1})
    if (this.state.count + 1 >= 3) {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    }
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false,
        selectedTicket: null
      });
  }
  
  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.count === 0) {
      currentlyVisibleState = 
      <Question 
        questionNumber = {1} questionText = "Have you gone through all the steps on the Learn How to Program debugging lesson?" />;
      buttonText = "Yes";
    } else if (this.state.count === 1) {
      currentlyVisibleState = 
      <Question 
        questionNumber = {2} questionText = "Have you asked another pair for help?" />;
      buttonText = "Yes"; 
    } else if (this.state.count === 2) {
      currentlyVisibleState = 
      <Question 
        questionNumber = {3} questionText = "Have you spent 15 minutes going through through the problem documenting every step?"/>;
      buttonText = "Yes"; 
    } else if (this.state.editing ) {      
        currentlyVisibleState = 
        <EditTicketForm 
          ticket = {this.state.selectedTicket} 
          onEditTicket = {this.handleEditingTicketInList} />
        buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null){
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick}/>
      buttonText="Return to Ticket List";
    } else if (this.state.formVisibleOnPage){
      currentlyVisibleState = 
      <NewTicketForm
        onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket list";
    } else {
      currentlyVisibleState = 
      <TicketList 
        ticketList={this.state.mainTicketList} 
        onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText= 'Add Ticket';
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;