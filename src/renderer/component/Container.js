import React, { Component } from 'react';
import '../App.css';

const styles = {
  card: {
    width: '100.24px',
    height: '140.25px',
    margin: '3px',
    display: 'block'
  }
};

const obj1 = {
  label: 'I1',
  txt: 'I1',
  img: undefined
};
const obj2 = {
  label: 'I2',
  txt: 'I2',
  img: undefined
};

const invisibleCard1 = React.createElement('div', {
  draggable: false,
  key: obj1.label,
  src: obj1.img,
  style: styles.card
});

const invisibleCard2 = React.createElement('div', {
  draggable: false,
  key: obj2.label,
  src: obj2.img,
  style: styles.card
});

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      draggedL: null,
      dragged: null,
      draggedOver: null,
      draggedOverL: null,
      content: []
    };
    this.dragStart = this.dragStart.bind(this);
    this.over = this.over.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    this.updateContent(this.props.children); // Update the content state initially
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.updateContent(this.props.children); // Update the content state when props.children changes
    }
  }

  updateContent(children) {
    let content = React.Children.toArray(children);
    content = content.filter((it) => it.props.src != undefined);
    content.splice(3, 0, invisibleCard1, invisibleCard2);
    this.setState({ content });
  }

  dragStart(ev) {
    let dragged = ev.target;
    let location = [].indexOf.call(ev.target.parentNode.children, ev.target);
    this.setState({ dragged: dragged, draggedL: location });
    ev.dataTransfer.effectAllowed = 'copy';
  }

  onDrop(ev) {
    let { draggedL, draggedOverL, dragged, content } = this.state;
    let newContent = [].concat(content);

    // let movingValue = newContent.splice(draggedL, 1)[0];
    // newContent.splice(draggedOverL, 0, content[draggedL]);
    let temp = newContent[draggedOverL];
    newContent[draggedOverL] = newContent[draggedL];
    newContent[draggedL] = temp;

    // delete newContent[draggedL];
    console.log('dropped', draggedL, draggedOverL, dragged, newContent);

    newContent = newContent.filter((it) => it.props.src != undefined);
    newContent.splice(3, 0, invisibleCard1, invisibleCard2);
    this.setState({ content: newContent });
  }

  prevent(ev) {
    ev.preventDefault();
  }

  over(ev) {
    if (ev.target === this.state.draggedOver) return;
    let location = [].indexOf.call(ev.target.parentNode.children, ev.target);
    this.setState({ draggedOver: ev.target, draggedOverL: location });
  }

  render() {
    let draggableChildren = React.Children.map(
      this.state.content,
      (child, index) =>
        React.cloneElement(child, {
          onDragStart: this.dragStart,
          onDragEnter: this.over,
          onDrop: this.onDrop,
          onDragOver: this.prevent
        })
    );

    // draggableChildren.splice(3, 0, invisibleCard1, invisibleCard2);
    // console.log(draggableChildren)

    return (
      <div
        style={{
          width: '550px',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          display: 'flex'
        }}
      >
        {draggableChildren}
      </div>
    );
  }
}
