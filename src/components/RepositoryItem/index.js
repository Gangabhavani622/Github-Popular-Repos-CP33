// Write your code here

const RepositoryItem = props => {
  const {repositoryItem} = props
  const {imageUr, name, starsCount, forksCount, issuesCount} = repositoryItem

  return (
    <li>
      <img src={imageUr} alt={name} />
      <h1>{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        {forksCount}
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
