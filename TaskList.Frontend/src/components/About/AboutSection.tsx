import { Text } from "@fluentui/react/lib/Text";

export interface IAboutSectionProps {
  text: string;
  bulletPoints: string[];
}

export const AboutSection = (props: IAboutSectionProps) => {
  return (
    <section>
      <Text variant="xLarge">{props.text}</Text>
      <ul>
        {props.bulletPoints.map((bulletPoint) => (
          <li>{bulletPoint}</li>
        ))}
      </ul>
    </section>
  );
};
