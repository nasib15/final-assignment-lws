const NextSteps = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold mb-6">Next Steps</h3>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="text-primary">
            <i className="fas fa-envelope text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Check your email</h4>
            <p className="text-zinc-600">
              We&apos;ve sent your confirmation and trip details to your email
              address.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-primary">
            <i className="fas fa-comment-alt text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Message your host</h4>
            <p className="text-zinc-600">
              Introduce yourself and let them know your travel plans.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-primary">
            <i className="fas fa-suitcase text-xl"></i>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Plan your trip</h4>
            <p className="text-zinc-600">
              Review house rules and check-in instructions in your trip details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NextSteps;
