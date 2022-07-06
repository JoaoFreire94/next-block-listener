import { Button, Img } from "@chakra-ui/react";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from "wagmi";

export function Profile() {
    const { address, connector, isConnected } = useAccount();
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
    const { data: ensName } = useEnsName({ address });
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <div>
                {ensAvatar !== undefined && (
                    <Img src={ensAvatar} alt="ENS Avatar" />
                )}
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                {connector !== undefined && (
                    <div>Connected to {connector.name}</div>
                )}
                <Button onClick={() => disconnect()}>Disconnect</Button>
            </div>
        );
    }

    return (
        <div>
            {connectors.map((connector) => (
                <Button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    style={{ color: "blue" }}
                >
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        " (connecting)"}
                </Button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    );
}
