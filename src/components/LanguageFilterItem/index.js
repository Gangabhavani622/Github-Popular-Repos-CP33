// Write your code here

const LanguageFilterItem = props => {
  const {language, id, activeLanguageId} = props
  const updateActiveId = () => {
    activeLanguageId(id)
  }

  return (
    <li>
      <button type="button" onClick={updateActiveId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
