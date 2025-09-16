import clsx from "clsx";

const defaultIconSize = "w-8 h-8";

export const FeatureCard = ({ icon: Icon, iconSize, title, description }) => {
  return (
    <div className="bg-surface p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
      <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto mb-6">
        {Icon && (
          <Icon
            className={clsx(
              iconSize ? iconSize : defaultIconSize,
              " text-foreground"
            )}
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-heading mb-4">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
};

export const ContactCard = ({ icon: Icon, iconSize, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
      {Icon && (
        <Icon
          className={clsx(
            iconSize ? iconSize : defaultIconSize,
            " text-foreground mx-auto mb-4"
          )}
        />
      )}
      <h3 className="text-xl font-semibold text-heading mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
};
