function AddPost() {
  return (
    <>
      <form className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Apa yang anda pikirkan?</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
           Headline
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="headline"
            type="headline"
            placeholder="Enter your Headline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows={5}
            placeholder="Enter your Description"
            defaultValue={""}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AddPost;
