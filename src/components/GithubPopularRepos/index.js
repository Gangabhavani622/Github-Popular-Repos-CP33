import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiUrlStatus: apiStatusConstants.initial,
    languageFilterList: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  activeLanguageId = activeId => {
    this.setState({activeId})
  }

  getRepositories = async () => {
    const {activeId} = this.state
    this.setState({apiUrlStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchData = await response.json()
      const updateData = fetchData.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))
      this.setState({
        languageFilterList: updateData,
        apiUrlStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiUrlStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderHeader = () => (
    <ul>
      {languageFiltersData.map(eachItem => (
        <LanguageFilterItem
          filterItem={eachItem}
          key={eachItem.id}
          activeLanguageId={this.activeLanguageId}
        />
      ))}
    </ul>
  )

  renderLanguageList = () => {
    const {languageFilterList} = this.state
    return (
      <ul>
        {languageFilterList.map(eachRepo => (
          <RepositoryItem repositoryItem={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiUrlStatus} = this.state

    switch (apiUrlStatus) {
      case apiStatusConstants.success:
        return this.renderLanguageList()

      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Popular</h1>
        {this.renderHeader()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
