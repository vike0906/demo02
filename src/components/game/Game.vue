<template>
  <div class="warpper">
    <div class="game-model" v-show="gameModelShow">
      <a-button type="primary" class="model-button" block @click="palyerModel">玩家对战</a-button>
      <br />
      <br />
      <br />
      <a-button type="primary" class="model-button" block @click="computerModel">人机对战</a-button>
    </div>
    <div v-show="chessBoardShow">
      <div>
        <a-button type="primary" icon="double-left" @click="exitGame">退出对战</a-button>
        <a-button type="primary" icon="reload" @click="refreshGame">重新开始</a-button>
        <a-button type="primary" icon="like" @click="giveUp">认输</a-button>
      </div>
      <br />
      <canvas id="gobang" class="gobang" width="900" height="900" @click="on_click">
        您的浏览器不支持 HTML5 canvas
        标签
      </canvas>
    </div>
    <!-- onmousemove="on_mouse_move(event)" -->
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
  data() {
    return {
      gameModelShow: true,
      chessBoardShow: false,
      gobang: {},
      cxt: {},
      chessBoard: [],
      isFirst: true,
      isEnd: false,
      path: "ws://localhost:8085/webSocket/chess/",
      socket: null,
    };
  },
  mounted() {
    setTimeout(_ => {
      this.init();
    });
  },
  methods: {
    // 初始化
    init() {
      this.gobang = document.getElementById("gobang");
      this.cxt = this.gobang.getContext("2d");
      this.fillArray();
      this.drawChessBoard();
      this.createWebSocekt();
    },

    createWebSocekt() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        let webSocketPath =
          this.path + JSON.parse(sessionStorage.getItem("user")).token;
        this.socket = new WebSocket(webSocketPath);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
        // 销毁监听
        this.socket.onclose = this.close;
      }
    },

    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      console.log(msg.data);
    },
    send: function() {
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    },

    computerModel() {
      Modal.info({
        title: "暂未开通",
        content: "人机对战模式暂未开通",
        okText: "确定",
        onOk() {
          // pass
        }
      });
    },
    palyerModel() {
      this.gameModelShow = false;
      this.chessBoardShow = true;
    },
    exitGame() {
      this.gameModelShow = true;
      this.chessBoardShow = false;
      this.endGame();
    },
    refreshGame() {
      this.endGame();
    },
    giveUp() {
      //pass
    },
    endGame() {
      this.fillArray();
      this.drawChessBoard();
      this.isEnd = false;
      this.isFirst = true;
    },
    fillArray() {
      let chessBoard = new Array(15);
      for (let i = 0; i < 15; i++) {
        chessBoard[i] = new Array(15);
        for (let j = 0; j < 15; j++) {
          chessBoard[i][j] = {
            serNo: i + 1 + "" + (j + 1) + "",
            offsetX: (i + 1) * 60 - 30,
            offsetY: (j + 1) * 60 - 30,
            status: 0
          };
        }
      }
      this.chessBoard = chessBoard;
    },

    drawChessBoard() {
      let cxt = this.cxt;
      this.gobang.height = this.gobang.height;
      cxt.strokeStyle = "#ababab";
      for (let i = 0; i < 15; i++) {
        cxt.moveTo(30, i * 60 + 30);
        cxt.lineTo(870, i * 60 + 30);
        cxt.stroke();

        cxt.moveTo(i * 60 + 30, 30);
        cxt.lineTo(i * 60 + 30, 870);
        cxt.stroke();
      }
      this.punctuation(this.chessBoard[3][3]);
      this.punctuation(this.chessBoard[3][11]);
      this.punctuation(this.chessBoard[7][7]);
      this.punctuation(this.chessBoard[11][3]);
      this.punctuation(this.chessBoard[11][11]);
    },
    on_click(e) {
      const ox = e.offsetX;
      const oy = e.offsetY;
      const x = Math.floor(ox / 60);
      const y = Math.floor(oy / 60);
      let chess = this.chessBoard[x][y];
      if (chess.status === 0) {
        if (this.distance(ox, oy, chess)) {
          return;
        }
        if (this.isEnd == true) {
          this.$notification.open({
            message: "对局已结束",
            description: "本轮对局已结束，快点击重新开始开启下一轮对局吧",
            icon: <a-icon type="smile" style="color: #108ee9" />
          });
          return;
        }
        this.socket.send(JSON.stringify({"x":x,"y":y}));
        chess.status = 1;
        this.onStep(chess.offsetX, chess.offsetY, this.isFirst);
        if (this.isWin(x, y)) {
          this.isEnd = true;
          let msg = "白棋获胜";
          if (this.isFirst) {
            msg = "黑棋获胜";
          }
          // that.$message.info(message);
          this.$notification.open({
            message: msg,
            description: "五子连成一条直线即可获胜",
            icon: <a-icon type="smile" style="color: #108ee9" />
          });
        }

        this.isFirst = this.isFirst == true ? false : true;
      }
    },
    distance(ox, oy, point) {
      let a = Math.abs(ox - point.offsetX);
      let b = Math.abs(oy - point.offsetY);
      return Math.pow(a, 2) + Math.pow(b, 2) > Math.pow(15, 2);
    },
    onStep(x, y, isFirst) {
      let cxt = this.cxt;
      cxt.beginPath();
      cxt.arc(x, y, 15, 0, 2 * Math.PI);
      cxt.closePath();
      const gradient = cxt.createRadialGradient(
        x + 2,
        y - 2,
        15,
        x + 2,
        y - 2,
        2
      );
      if (isFirst) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
      } else {
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
      }
      cxt.fillStyle = gradient;
      cxt.fill();
    },

    isWin(x, y) {
      if (this.cross(x, y) >= 5) {
        return true;
      }
      if (this.vertical(x, y) >= 5) {
        return true;
      }
      if (this.leftOblique(x, y) >= 5) {
        return true;
      }
      if (this.rightOblique(x, y) >= 5) {
        return true;
      }
      return false;
    },

    cross(x, y) {
      let count = 1;
      let chessBoard = this.chessBoard;
      for (let i = 1; i < 5; i++) {
        if (x - i >= 0 && chessBoard[x - i][y].status == 1) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 5; i++) {
        if (x + i <= 14 && chessBoard[x + i][y].status == 1) {
          count++;
        } else {
          break;
        }
      }
      return count;
    },
    vertical(x, y) {
      let count = 1;
      let chessBoard = this.chessBoard;
      for (let i = 1; i < 5; i++) {
        if (y - i >= 0 && chessBoard[x][y - i].status == 1) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 5; i++) {
        if (y + i <= 14 && chessBoard[x][y + i].status == 1) {
          count++;
        } else {
          break;
        }
      }
      return count;
    },
    leftOblique(x, y) {
      let count = 1;
      let chessBoard = this.chessBoard;
      for (let i = 1; i < 5; i++) {
        if (x - i >= 0 && y - i >= 0 && chessBoard[x - i][y - i].status == 1) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 5; i++) {
        if (
          x + i <= 14 &&
          y + i <= 14 &&
          chessBoard[x + 1][y + i].status == 1
        ) {
          count++;
        } else {
          break;
        }
      }
      return count;
    },
    rightOblique(x, y) {
      let count = 1;
      let chessBoard = this.chessBoard;
      for (let i = 1; i < 5; i++) {
        if (x - i >= 0 && y + i <= 14 && chessBoard[x - i][y + i].status == 1) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 5; i++) {
        if (x + i <= 14 && y - i >= 0 && chessBoard[x + i][y - i].status == 1) {
          count++;
        } else {
          break;
        }
      }
      return count;
    },
    punctuation(point) {
      let cxt = this.cxt;
      cxt.fillStyle = "#000";
      cxt.beginPath();
      cxt.arc(point.offsetX, point.offsetY, 3, 0, 2 * Math.PI);
      cxt.closePath();
      cxt.fill();
    }
  },
  destroyed() {
    this.socket.close();
  }
};
</script>

<style scoped>
.warpper {
  text-align: center;
  margin-top: 10px;
}
.game-model {
  margin-top: 10rem;
  text-align: center;
}
.model-button {
  width: 40%;
  height: 6rem;
  /* background-color: #5694fb; */
}

.gobang {
  background-color: #f4f6f7;
  border: 1px solid #827777;
  border-radius: 5px;
  box-shadow: -2px 0 2px #efefef, 5px 5px 5px #b9b9b9;
}
</style>