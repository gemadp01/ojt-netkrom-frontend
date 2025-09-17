import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import clsx from "clsx";
import { ArrowRight, Star } from "lucide-react";

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

export const ProductCard = ({ product, viewMode, formatPrice }) => {
  return (
    <div
      className={`bg-background rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div
        className={`relative ${
          viewMode === "list" ? "w-48 flex-shrink-0" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover ${
            viewMode === "list" ? "w-full h-48" : "w-full h-64"
          }`}
        />
        <Badge>{product.category}</Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-surface px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        <h3 className="text-xl font-semibold text-heading mb-2">
          {product.name}
        </h3>
        <p className="text-text-secondary mb-3 text-sm">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-subtle-text"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-text-secondary">
            ({product.rating}) • {product.reviews} reviews
          </span>
        </div>

        <div
          className={`flex flex-col items-start ${
            viewMode === "list" ? "justify-between" : "justify-between"
          }`}
        >
          <span className="text-2xl font-bold text-heading">
            {formatPrice(product.price)}
          </span>
          <Button
            variant={product.inStock ? "primary" : "muted"}
            size="md"
            width="full"
            className="flex items-center justify-center"
            disabled={!product.inStock}
          >
            {product.inStock ? "View Details" : "Out of Stock"}
            {product.inStock && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const OurValuesCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-surface rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-border rounded-full mb-6">
        {Icon && <Icon className="text-3xl text-foreground" />}
      </div>
      <h3 className="text-xl font-semibold text-heading mb-3">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
};

export const ContactInformationCard = ({ icon: Icon, info }) => {
  return (
    <div className="bg-background rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-border rounded-full mb-6">
        {Icon && <Icon className="h-8 w-8 text-foreground" />}
      </div>
      <h3 className="text-xl font-semibold text-heading mb-3">{info.title}</h3>
      <div className="space-y-1 mb-3">
        {info.details.map((detail, idx) => (
          <p key={idx} className="text-text font-medium">
            {detail}
          </p>
        ))}
      </div>
      <p className="text-subtle-text text-sm">{info.description}</p>
    </div>
  );
};
