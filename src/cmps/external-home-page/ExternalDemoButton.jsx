import { MoveArrowRight } from "@vibe/icons";

const getButtonSizeStyles = (size) => {
    switch (size) {
        case "small":
            return {};
        case "large":
            return { fontSize: "1rem", padding: '16px 32px 16px 31px', paddingRight: '20px' };
        default:
            return {};
    }
}

const ExternalDemoButton = ({ size = "small" }) => {
    const styles = getButtonSizeStyles(size);
    return (
        <span
            role='link'
            className="external-rounded-button"
            style={styles}>
            View Demo
            <MoveArrowRight className="external-button-icon" />
        </span>
    )
}

export default ExternalDemoButton;