import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Trips from './components/Trip/Trips';
import { AddTrip } from './components/Trip/AddTrip';
import { ModifyTrip } from './components/Trip/ModifyTrip';
import { DeleteConfirmation } from './components/Trip/DeleteConfirmation';
import './custom.css'

export default class App extends Component {

  static displayName = App.name.toUpperCase();

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/addtrip' component={AddTrip} />
        <Route path='/trips' component={Trips} />
        <Route path='/modifytrip' component={ModifyTrip} />
        <Route path='/deleteconfirmation' component={DeleteConfirmation} />
      </Layout>
    );
  }
}
