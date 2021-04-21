import { Component } from '@angular/core';

const FOOD_OPTIONS = ['Cuban Sandwich', 'Corn Dogs', 'Pizza', 'Cheeseburgers', 'Street Tacos', 'Ramen Noodles', 'Gyros', 'Leftovers', 'Chicken Pesto Quinoa Bowl', 'Burritos'];

interface Message {
  text: string;
  senderClass: string;
  messageClass: string;
}

enum State {
  initial = 'initial',
  notHungry = 'notHungry',
  selectingFood = 'selectingFood',
  done = 'done',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  foodOptions: string[];
  messages: Message[];
  answers: string[];
  state: State;
  messagesCnt: number;

  constructor() {
    this.foodOptions = [...FOOD_OPTIONS];
    this.messages = [{
      text: 'Are you hungry?',
      senderClass: 'messages yours',
      messageClass: 'message last'
    }];
    this.answers = ['No', 'Yes'];
    this.state = State.initial;
    this.messagesCnt = 1;
  }

  restart(): void {
    this.foodOptions = [...FOOD_OPTIONS];
    this.messages = [{
      text: 'Are you hungry?',
      senderClass: 'messages yours',
      messageClass: 'message last'
    }];
    this.answers = ['No', 'Yes'];
    this.state = State.initial;
    this.messagesCnt = 1;
  }

  userResponse(answer: string): void {
    this.updateLastClassAndMessageCount();
    if (this.state === State.initial) {
      if (answer === 'No') {
        this.messages.push({
          text: 'No',
          senderClass: 'messages mine',
          messageClass: 'message last'
        });
        this.messages.push({
          text: 'Wrong website, we are always hungry',
          senderClass: 'messages yours',
          messageClass: 'message last'
        });
        this.state = State.notHungry;
        this.answers = [];
      } else {
        this.messages[0].messageClass = 'message';
        this.messages.push({
          text: 'Yes',
          senderClass: 'messages mine',
          messageClass: 'message last'
        });
        this.updateOptionAndAnswers();
      }
    } else if (this.state === State.selectingFood) {
      if (answer === 'Thanks') {
        this.messages.push({
          text: 'Thanks',
          senderClass: 'messages mine',
          messageClass: 'message last'
        });
        this.messages.push({
          text: 'Enjoy it!',
          senderClass: 'messages yours',
          messageClass: 'message last'
        });
        this.state = State.done;
        this.answers = [];
      } else {
        this.messages[0].messageClass = 'message';
        this.messages.push({
          text: 'Nah',
          senderClass: 'messages mine',
          messageClass: 'message last'
        });
        this.updateOptionAndAnswers();
      }
    }
  }

  updateLastClassAndMessageCount(): void {
    if (this.messagesCnt === 1) {
      this.messages[0].messageClass = 'message';
    } else {
      this.messages[this.messagesCnt - 1].messageClass = 'message';
      this.messages[this.messagesCnt - 2].messageClass = 'message';
    }
    this.messagesCnt += 2;
  }

  updateOptionAndAnswers(): void {
    if (this.foodOptions.length === 0) {
      this.messages.push({
        text: 'I\'m out of options, sorry :(',
        senderClass: 'messages yours',
        messageClass: 'message last'
      });
      this.state = State.done;
      this.answers = [];
    } else {
      this.messages.push({
        text: `Try: ${this.getRandomFood()}`,
        senderClass: 'messages yours',
        messageClass: 'message last'
      });
      this.state = State.selectingFood;
      this.answers = ['Nah', 'Thanks'];
    }
  }

  getRandomFood(): string {
    const randomIndex = Math.floor(Math.random() * this.foodOptions.length);
    const food = this.foodOptions[randomIndex];
    this.foodOptions.splice(randomIndex, 1);
    return food;
  }

}
