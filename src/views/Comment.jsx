function Comment() {
    return (
      <div>

  
              {/* comment */}
  
              <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                      Comment
                    </h2>
                  </div>
                  <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        id="comment"
                        rows={6}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required=""
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-500 rounded-lg focus:ring-4dark:focus:ring-blue-900 hover:bg-blue-600"
                    >
                      Post comment
                    </button>
                  </form>
  
                  <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"
                          />
                          Michael Gough
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            pubdate=""
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            Feb. 8, 2022
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      Very straight-to-point article. Really worth time reading.
                      Thank you! But tools are just the instruments for the UX
                      designers. The knowledge of the design tools are as
                      important as the creation of the design strategy.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                      >
                        <svg
                          className="mr-1.5 w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </article>
                </div>
              </section>
            </div>
         
    );
  }
  
  export default Comment;
  