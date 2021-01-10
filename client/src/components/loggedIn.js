import React, { useRef, Component } from 'react';

export default class LoggedIn extends Component {

    constructor(props) {
        super(props);
        this.homepage = React.createRef()
      }

    render() {
        return(

            <div id="container">
            <script>document.body.style="background-color:#FFD17C;"</script>
            <div id="user-profile">
              
              <script src="https://cdnjs.cloudflare.com/ajax/libs/spotify-web-api-js/1.5.1/spotify-web-api.js" integrity="sha512-lNAdXpUi8E6pEVDtriZ7PbNF1m9W4wYKawVkmkppB9aTBPNMmQPQmb/9LiH3qXG10DLHleRDPK4Sm2v14dIO7A==" crossorigin="anonymous"></script>
              <script src="../../public/getUserData.js"></script>
              <script> 
                  console.log("hello");
              </script>
            </div>
        </div>
        )
    }
}