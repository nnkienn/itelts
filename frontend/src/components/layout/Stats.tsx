export default function stats(){
  return(
    <div className="w-full max-w-5xl rounded-3xl border border-green-500 shadow-lg shadow-green-100 p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-12">
            Millions are becoming better writers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <div>
              <p className="text-3xl font-bold text-green-600">1000+</p>
              <p className="text-gray-600">Writers<br />worldwide</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">3+</p>
              <p className="text-gray-600">Countries that<br />use ScoringIelts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">140+</p>
              <p className="text-gray-600">Institutions partnered<br />with ScoringIelts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">4.7/5</p>
              <p className="text-gray-600">rating</p>
            </div>
          </div>
        </div>
  )
}