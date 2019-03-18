import React, { Component } from 'react';
import Stack from './Stack';
import styled from 'styled-components';
import '../App.css';
import {sortableContainer} from 'react-sortable-hoc';
import AddHabitModule from './AddHabitModule';
import AddStackModule from './AddStackModule';


/**************
Holds the Daily Stacks View


TO DO

- 'add' button
  - addOptions
  - cancel

- display stacks and habits

- display empty stacks component if no stacks

**************/



const SortableContainer = sortableContainer(({children}) => {
  return <div>{children}</div>;
});
const Head = styled.div`
  position:fixed;
  top:0; left:0;
  display: flex;
  flex-direction : row;
  justify-content: flex-end;
  align-items: center;
  width:100%;
  height: 100px;
  background-color: #fff;
  z-index: 5;
`
const MainDate = styled.h3`
  font-size: 1.063rem;
  color: #4E4E4E;
  margin: 0px;
  margin-left: 1rem;
  margin-right: auto;
`
const AddNew = styled.button`
  background: #FEBE00;
  margin-right: 9px;
`
const Edit = styled.button`
  background: #F3F3F3;
  margin-right: 9px;
`
const Reset = styled.button`
  background: #F3F3F3;
  position: absolute;
  left: 10px;
  bottom: 20px;
`
const NextDay = styled.button`
  background: #F3F3F3;
  position: absolute;
  left: 100px;
  bottom: 20px;
`
const AddSection = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 85%;
  background: #FFF3C3;
  border: 2px solid #FEBE00;
  border-radius: 11px;
  justify-content: space-around;
  transition: height .25s ease;

  ${({addModeIsActive}) => {
      if (addModeIsActive){
        return `height: 55px;
        border-width: 2px`
      }
      else {
        return `height: 0px;
        border-width:0px
        width:0px;`
      }
  }}
`
const AddButton = styled.div`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 500;
  color:#FEBE00;
`
const AddStackSection = styled(AddSection)`
  margin-left: calc(0.625rem + 15px);
`




class ViewStacks extends Component {

  render() {

    const {stacks} = this.props.stacks;

    let addMode = "Add";
    let editMode = "Edit";
    if (this.props.activeStates.addModeIsActive){addMode = "Cancel"}
    if (this.props.activeStates.editModeIsActive){editMode = "Cancel"}

    return (
      <>
        <AddHabitModule
            activeStates={this.props.activeStates}
            cancelActiveModules={this.props.cancelActiveModules}
            addHabitFormSubmission={this.props.addHabitFormSubmission}
        />
        <AddStackModule
            activeStates={this.props.activeStates}
            cancelActiveModules={this.props.cancelActiveModules}
            addStackFormSubmission={this.props.addStackFormSubmission}
        />
        <Head>
          <MainDate>{this.props.day}</MainDate>
          <AddNew onClick={this.props.toggleAddMode}>
              {addMode}
          </AddNew>
          <Edit> {editMode} </Edit>
        </Head>
        <SortableContainer
          onSortEnd={this.props.onSortEnd}
          useDragHandle={true}
          lockAxis="y"
          >

          {stacks.map((items, index) => (

            <Stack
              stacksItems={items}
              stacksIndex={index}
              key={index}
              stacksInfo={this.props.stacksInfo}
              height={this.props.stacksInfo[index].height}
              streak={this.props.stacksInfo[index].streak}
              toggleStack={this.props.toggleStack}
              logHabit={this.props.logHabit}
              addHabit={this.props.addHabit}
              addStack={this.props.addStack}
              activeStates={this.props.activeStates}
            />
          ))}
          <AddStackSection addModeIsActive={this.props.activeStates.addModeIsActive}>
            <AddButton onClick={() => this.props.addStack(this.props.stacksIndex)}> + Stack </AddButton>
          </AddStackSection>
        </SortableContainer>
        <Reset onClick={this.props.clearStorage}>Reset</Reset>
        <NextDay onClick={this.props.nextDay}>Next Day</NextDay>
    </>
    );
  }
}



export default ViewStacks;
