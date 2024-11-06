// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        try{
            if (message === "" || message === null) {
                
                var reply = this.actionProvider.createChatBotMessage("Please enter a message");
                this.actionProvider.updateChatbotState(reply);
            } else {
                this.actionProvider.run(message)
            }
        } catch(err) {
            console.log(err)
        }
   
    }
}
  
  export default MessageParser;