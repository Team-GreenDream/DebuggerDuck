import React from 'react';
import getMenu from './lib/getMenu.js'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      text:'',
      price: null,
      menu: []
    }
  }
  componentDidMount() {
    //this will call getMenu on the location we're at in the volunteer Modal
    getMenu(this.props.location, (menu) => {
      this.setState({menu: menu})
    })
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    var value = event.target.value.split('__')
    var text = value[0]
    var price = value[1]
    console.log('Request Event', text, price);
    this.setState({text: text, price: price});
  }

  onSubmit () {
    //Don't change this invocation.
    console.log('modal text?', this.state.text);
    this.props.onSubmit(this.state.text, this.state.price);
    this.hideModal();
    this.setState({
      isOpen: false,
      text: ''
    });
  }

  openModal (){
    this.setState({
      isOpen: true
    });
  };

  hideModal(){
    this.setState({
      isOpen: false
    });
  };


  render() {
    let subModalDialogStyles = {
      base: {
        bottom: -600,
        transition: 'bottom 0.4s'
      },
      open: {
        bottom: 0
      }
    };
    let {isOpen, isSubOpen} = this.state;
    return (
        <div className='center orange'>
          <button className="red-button" onClick={() => this.openModal()}>
            Make a request
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={()=>this.hideModal()}/>

            </ModalHeader>
            <div className='modal-inside'>
              <div>
                Please select an item from our menu below:
                <br />
                <select onChange={this.onTextChange.bind(this)}>
                    {this.state.menu.map(item => {
                      return (
                        <option value={item.menuItem + '__' + item.price}>{item.menuItem} - {item.price}</option>
                      )
                    })}
                </select>
              </div>
            </div>
            <ModalFooter>
              <button className="red-button" onClick={()=>this.onSubmit()}>
                Submit
              </button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default RequestModal;
