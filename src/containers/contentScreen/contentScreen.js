import React, { Component } from "react";
import { connect } from 'react-redux';
import { getContentList, searchContent, toggleSearchBar } from './contentScreen.action';
import _debounce from 'lodash.debounce';

class ContentScreen extends Component {
    constructor() {
        super();
        this.page = 1;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var options = {
            root: null,
            rootMargin: "300px",
            threshold: 0.1
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleChange(event) {
        event.persist();
        if (!this._debounce) {
            this._debounce = _debounce(() => {
                this.props.searchContent(event.target.value);
            }, 500)
        }
        this._debounce();
    }

    handleObserver(entities, observer) {
        if (entities[0].isIntersecting) {
            if (this.page <= 3) {
                this.getContent(this.page++)
            }
        }
    }

    getContent(page) {
        this.props.getContentList(page);
    }

    renderHeader() {
        return (
            <>
                <img src={`public/img/Back.png`} className="h-4 m-2 mr-1 sm:h-4 cursor-pointer" />
                <div className="text-white sm:text-lg flex-1 ml-1">Romantic comedy</div>
                <img
                    src={`public/img/search.png`}
                    className="h-4 mr-2 sm:h-4"
                    onClick={this.props.toggleSearchBar.bind(this, true)}
                />
            </>
        );
    }

    renderSearchBar() {
        return (
            <>
                <img
                    src={`public/img/Back.png`}
                    className="h-4 m-2 mr-3 sm:h-4 cursor-pointer"
                    onClick={this.props.toggleSearchBar.bind(this, false)}
                />
                <input
                    autoFocus={"autofocus"}
                    placeholder="Search"
                    className="shadow appearance-none border rounded text-grey-darker focus:outline-none sm:w-80"
                    onChange={this.handleChange}
                />
            </>
        )
    }

    filterContent() {
        const { listOfContents, searchKey } = this.props;
        if (searchKey) {
            return listOfContents.filter((content) => {
                return content.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            })
        }
        return listOfContents
    }

    renderContents(content, key) {
        return (
            <div
                className="m-1.5 mt-5 flex flex-wrap justify-center" key={key}
                key={key}
            >
                <div>
                    <img
                        src={`public/img/${content["poster-image"]}`}
                        onError={(e) => {
                            console.log(this)
                            e.target.src = `public/img/placeholder_for_missing_posters.png`
                        }}
                        className="max-h-64"
                    />
                    <div className="text-xs	mt-2 text-white">
                        {content["name"]}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { isSearchBarVisible } = this.props;
        return (
            <div className="bg-black">
                <div className="flex items-center sm:h-16 h-12 sticky top-0 justify-center" style={{ backgroundImage: "url(public/img/nav_bar.png)" }}>
                    {isSearchBarVisible ? this.renderSearchBar() : this.renderHeader()}
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 m-0.5 mb-0 min-h-screen">
                    {this.filterContent().map(this.renderContents)}
                </div>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ contentScreenReducer }) => ({
    listOfContents: contentScreenReducer.listOfContents,
    isSearchBarVisible: contentScreenReducer.isSearchBarVisible,
    searchKey: contentScreenReducer.searchKey,
})

const mapDispatchToProps = { getContentList, searchContent, toggleSearchBar }

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);