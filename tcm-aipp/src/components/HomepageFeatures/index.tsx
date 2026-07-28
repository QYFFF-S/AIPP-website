import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  backgroundColor: string,
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'TCM Target Organ Prediction',
    Svg: require('@site/static/img/target-tools.svg').default,
    backgroundColor: '#06949F',
    description: (
      <>
        Predicting the potential effective organs of compounds/TCMs (combination of multiple compounds) based on the corresponding target(s).
        Required: Target list
        Taxonomy: ·Liver ·Heart ·Lung ·Kidney ·Testis ·Retina ·Cerebellum
      </>
    ),
  },
  {
    title: 'TCM Flavor Preciction',
    Svg: require('@site/static/img/flavor-tools.svg').default,
    backgroundColor: '#EB6D73',
    description: (
      <>
        Predicting the potential flavors of compounds/TCMs (combination of multiple compounds) based on SMILES.
        Required: SMILES
        Taxonomy: ·Sour ·Bitter ·Sweet ·Pungent ·Salty
      </>
    ),
  },
  {
    title: 'TCM Toxicity Prediction',
    Svg: require('@site/static/img/toxicity-tools.svg').default,
    backgroundColor: '#262626',
    description: (
      <>
        Predicting the potential toxicity of compounds/TCMs (combination of multiple compounds) by inputting SMILES.
        Required: SMILES
        Taxonomy: ·Acute toxicity ·Hepatotoxicity ·Cardiotoxicity ·Nephrotoxicity ·Neurotoxicity ·Respiratory Toxicity ·Reproductive Developmental Toxicity
      </>
    ),
  },
];

function Feature({title, Svg, description, backgroundColor}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{backgroundColor: backgroundColor}}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
