import React from 'react';
import {connect} from 'react-redux';
import {View, Panel, PanelHeader, Search, Spinner} from '@vkontakte/vkui';
import {searchMovies} from '../actions';
import CardMoviesList from './CardMoviesList';

class SearchView extends React.Component {
  timeId = null;

  onChange = (search) => {
    this.timeId && clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.props.dispatch(searchMovies(search));
    }, 500);
  }

  render = () => (
    <View id={this.props.id} activePanel={this.props.id}>
      <Panel id={this.props.id}>
        <PanelHeader noShadow>#ЧТОПОСМОТРЕТЬ</PanelHeader>
        <Search onChange={this.onChange}/>
        <br/>
        <CardMoviesList movies={this.props.search}/>
        {this.props.loading ? (<div style={{height: 100}}><Spinner/></div>) : null}
      </Panel>
    </View>
  )
}

function mapStateToProps(state) {
  return {
    search: state.movies.search,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(SearchView);