const TicTacToeGame = React.createClass({
  getInitialState(){
    return {
      //Initial State of the Game
      tiles:['','','',
            '','','',
            '','',''],
      //x will always have the first turn
      turn:'x',
      winner:'n'
    }
  },

  checkBoard: function() {
	  var t = this.state.tiles;
	  var check = function(a,b,c) {
	      return !!(a + b + c).match(/^(xxx|ooo)$/gi);
	  };
	  if (check(t[0], t[1], t[2])) return t[0];
	  if (check(t[3], t[4], t[5])) return t[3];
	  if (check(t[6], t[7], t[8])) return t[6];

	  if (check(t[0], t[3], t[6])) return t[0];
	  if (check(t[1], t[4], t[7])) return t[1];
	  if (check(t[2], t[5], t[8])) return t[2];

	  if (check(t[0], t[4], t[8])) return t[0];
	  if (check(t[2], t[4], t[6])) return t[2];

	  if (t.join('').length === 9) return 'd';
	  return 'n';
    },

        resetGame: function() {
            this.setState(this.getInitialState());
        },


  //modifies the state of tile Array
  tileClick:function(index,player){
    console.log('index',index);
    const tiles = this.state.tiles;
    
    
        console.log('player',player)
       console.log("tiles",tiles);
    //If the selected position is already filled, return to prevent it being replaced.
    if ( (tiles[index] === 'x' || tiles[index] === 'o') ||(this.state.winner !== 'n')  ) {
      console.log("early return");
      return ;
    }
    console.log('player1',player)

    tiles[index] = player;
    console.log("tiles",tiles);
    let turn = player === 'x' ? 'o' : 'x'
    console.log(turn);
    this.setState({tiles: tiles ,turn:turn,winner: this.checkBoard()});
  },

  render(){
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
          <div id='game'>
            {this.state.tiles.map(function(tile,index){
            return (
              <Tile status={tile} key={index} ind= {index} turn ={this.state.turn}
                    tileClick={() => this.tileClick(index, this.state.turn)}/>
            );
          },this)}
        </div>
        <Menu turn={this.state.turn} winner={this.state.winner} resetGame={this.resetGame} />
      </div>
      )

  }
});

// Tile Component
const Tile = React.createClass({
   clickHandler: function() {
        this.props.tileClick(this.props.ind, this.props.turn);
        console.log('turn in tile',this.props.turn);
        console.log('key in tile',this.props.ind);
    },

  render(){
      return(
       <div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.clickHandler}>{this.props.status}</div>

      );
  }
});

//Menu Component
const Menu = React.createClass({
  render(){
    return (
      <div id='menu'>
       <h3 className={this.props.winner === 'n' ? 'visible' : 'hidden'}>Player {this.props.turn}'s turn.</h3>
       <h3 className={(this.props.winner === 'n') || (this.props.winner === 'd') ? 'hidden' : 'visible'}>Player {this.props.winner} won!</h3>
       <h3 className={this.props.winner === 'd' ? 'visible' : 'hidden'}>Draw Game :(</h3>
       <button onClick={this.props.resetGame}>Reset Game</button>
      </div>
      )
  }
});
ReactDOM.render(<TicTacToeGame/>,document.getElementById('root'));