//example of Redux flow through an insurance company analogy

//Action Creators (3)
//(People dropping off a create policy form)
//func returns action (js object)
import { createStore, combineReducers } from "redux";

console.clear();

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

const action = createPolicy("Alex", 20);

store.dispatch(action);

console.log(store.getState());

console.log(action);

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: { name: name, amount: amount }
  };
};

const deletePolicy = name => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

//Reducers
//each reducer models a diff dept in insurance company
//each reducer called with action (form) created by action Creators

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //we care about this action
    return [...oldListOfClaims, action.payload];
    //spread operator joins contents of two arrays
    //using push would accidentally nest two arrays
  }
  return oldListOfClaims;
};

//company initially has 100
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  } else {
    return bagOfMoney;
  }
};

const policies = (existingPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...existingPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return existingPolicies.filter(name => name !== action.payload.name);
  } else {
    return existingPolicies;
  }
};
