function WeightsNote() {
  return (
    <div>
      <p className="font-mono">* Note: *</p>
      <p className="font-mono">
        1. No category weight is considered by default
      </p>
      <p className="font-mono">2. Put in 0 if not considered in grading</p>
      <p className="font-mono">
        3. Don't include percentage sign inside input box
      </p>
      <p className="font-mono">
        (Example: put in "25" if a category is considered 25% of total grade)
      </p>
      <p className="font-mono">4. Inputed numbers has to add up to 100</p>
      <br></br>
    </div>
  )
}

export default WeightsNote