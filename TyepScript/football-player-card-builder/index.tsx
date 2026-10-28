const { useState } = React;



interface PlayerData {
    name: string;
    overallRating: number;
    position: string;
    club: string;
    imageUrl: string;
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
}

export function getPlayerTier(rating: number): string {
    if (rating >= 92) return "elite";
    if (rating >= 85) return "gold";
    if (rating >= 75) return "silver";
    return "bronze";
}

export const PlayerCard = ({ player }: { player: PlayerData }) => {
    return (
        <div className={`card-wrapper tier-${getPlayerTier(player.overallRating)}`}>
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-rating">{player.overallRating}</div>
                        <div className="card-position">{player.position}</div>
                    </div>
                    <div className="card-header-right">
                        <div className="card-tier-badge">
                            {getPlayerTier(player.overallRating).toUpperCase()}
                        </div>
                        <div className="card-club">{player.club}</div>
                    </div>
                </div>
                <div className="card-image-wrap">
                    <img src={player.imageUrl} alt={`${player.name} headshot`} className="card-image" />
                </div>
                <div className="card-name-strip">
                    <span className="card-name">{player.name}</span>
                </div>
                <div className="card-stats">
                    <div className="stat-col">
                        <div className="stat-row">
                            <span className="stat-value">{player.pac}</span>
                            <span className="stat-label">PAC</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-value">{player.sho}</span>
                            <span className="stat-label">SHO</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-value">{player.pas}</span>
                            <span className="stat-label">PAS</span>
                        </div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-col">
                        <div className="stat-row">
                            <span className="stat-value">{player.dri}</span>
                            <span className="stat-label">DRI</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-value">{player.def}</span>
                            <span className="stat-label">DEF</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-value">{player.phy}</span>
                            <span className="stat-label">PHY</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const defaultPlayer: PlayerData = {
    name: "PELE",
    overallRating: 98,
    position: "ST",
    club: "Santos FC",
    imageUrl: "https://cdn.freecodecamp.org/curriculum/typescript/tsx-workshop/pele.jpg",
    pac: 97,
    sho: 98,
    pas: 83,
    dri: 99,
    def: 41,
    phy: 75,
};

export const FootballPlayerCard = () => {
    const [player, setPlayer] = useState<PlayerData>(defaultPlayer);
    return (
        <div className="page">
            <header className="header">
                <div className="header-inner">
                    <p className="header-title">Football Card Builder</p>
                    <p className="header-subtitle">Customize your player card</p>
                </div>
            </header>
            <main className="main">
                <div className="layout">
                    <div className="form-panel">
                        <div>
                            <p className="form-section-title">Player Info</p>
                            <div className="form-group">
                                <label className="label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    className="input"
                                    type="text"
                                    value={player.name}
                                    onChange={(e) =>
                                        setPlayer({ ...player, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="label" htmlFor="position">
                                        Position
                                    </label>
                                    <input id="position" className="input" type="text" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="overallRating">
                                        Overall
                                    </label>
                                    <input id="overallRating" className="input" type="number" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label" htmlFor="club">
                                    Club
                                </label>
                                <input id="club" className="input" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="label" htmlFor="imageUrl">
                                    Image URL
                                </label>
                                <input id="imageUrl" className="input" type="text" />
                            </div>
                        </div>
                        <div>
                            <p className="form-section-title">Player Stats</p>
                            <div className="stats-grid">
                                <div className="form-group">
                                    <label className="label" htmlFor="pac">
                                        PAC
                                    </label>
                                    <input id="pac" className="input" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="sho">
                                        SHO
                                    </label>
                                    <input id="sho" className="input" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="pas">
                                        PAS
                                    </label>
                                    <input id="pas" className="input" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="dri">
                                        DRI
                                    </label>
                                    <input id="dri" className="input" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="def">
                                        DEF
                                    </label>
                                    <input id="def" className="input" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="phy">
                                        PHY
                                    </label>
                                    <input id="phy" className="input" type="number" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="preview-panel">
                        <p className="preview-label">Live Preview</p>
                        <p className="preview-hint">Updates as you type</p>
                        <div
                            className={`preview-box tier-${getPlayerTier(player.overallRating)}`}
                        >
                            <PlayerCard player={player} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};