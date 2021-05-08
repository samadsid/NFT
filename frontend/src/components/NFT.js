import React, { Component } from 'react'
import Header from './Header'
import { createToken, getCurrentAddressMetamask, getBalance, getTokenURI } from './Web3'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class NFT extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account: "",
            web3: null,
            tokenArray: []
        }
    }




    async componentDidMount() {
        let account = await getCurrentAddressMetamask()
        this.setState({
            account
        }, async () => {

            window.ethereum.on('accountsChanged', (accounts) => {
                this.setState({
                    account: accounts[0]
                }, async () => {
                    await this.getNFTS()
                })
            })
            await this.getNFTS()
        })

    }

    getNFTS = async () => {
        console.log("yess")
        let { account } = this.state;
        if (account) {
            let balance = await getBalance(account)
            console.log(balance)
            let i = 1;
            let tokenArray = []
            while (i <= balance) {
                let tokenURI = await getTokenURI(i)
                let data = await axios.get(`${tokenURI}${i}`);
                let tokenData = data.data.token
                if (tokenData) tokenArray.push(tokenData)
                console.log(data);
                i++;
            }
            this.setState({
                tokenArray
            })
        } else {
            alert("Invalid Address, Please connect metamask with the blockchain",)
        }
    }

    createToken = async () => {
        let { account } = this.state;
        await createToken(account)
        this.getNFTS()
    }



    render() {
        // const classes = useStyles();
        // const useStyles = makeStyles({
        //     root: {
        //         maxWidth: 345,
        //     },
        //     media: {
        //         height: 140,
        //     },
        // });
        const { tokenArray } = this.state
        return (
            <div>
                <Header address={this.state.account} />
                <div className="text-center">
                    <h1 >Number of NFT's you hold are listed below</h1>
                    <button disabled={tokenArray.length == 3} onClick={this.createToken}>Create NFT</button>
                </div><br /><br />
                { tokenArray.length != 0 ?
                    tokenArray.map((token) => {
                        { console.log(token) }
                        return (
                            <Card style={{ maxWidth: 345, margin: 50 }} >
                                <CardActionArea>
                                    <img width={345} src={token.image} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {token.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {token.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )

                    }) :
                    <div>
                        <h1>This account does not hold any NFT</h1>
                    </div>

                }
            </div>
        )
    }
}

export default NFT
