'use client';

export function ScrollBarProps({ children }: { children: React.ReactNode }) {
    return (
        <>
            <style jsx global>
                {`
                    /* Basic scrollbar styling */
                    ::-webkit-scrollbar {
                        width: 6px;
                        height: 6px;
                    }

                    /* Track styles */
                    ::-webkit-scrollbar-track {
                        background: transparent;
                        border-radius: 12px;
                        margin: 4px;
                    }

                    /* Handle/thumb styles */
                    ::-webkit-scrollbar-thumb {
                        background: linear-gradient(to bottom, rgb(6 182 212 / 0.3), rgb(16 185 129 / 0.3));
                        border-radius: 12px;
                        transition: all 0.2s ease;
                    }

                    /* Handle on hover */
                    ::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(to bottom, rgb(6 182 212 / 0.4), rgb(16 185 129 / 0.4));
                    }

                    /* Handle when active/being dragged */
                    ::-webkit-scrollbar-thumb:active {
                        background: linear-gradient(to bottom, rgb(6 182 212 / 0.5), rgb(16 185 129 / 0.5));
                    }

                    /* Corner styles */
                    ::-webkit-scrollbar-corner {
                        background: transparent;
                    }

                    /* Firefox support */
                    html {
                        scrollbar-width: thin;
                        scrollbar-color: rgb(6 182 212 / 0.3) transparent;
                    }

                    /* Dark mode adjustments */
                    @media (prefers-color-scheme: dark) {
                        ::-webkit-scrollbar-thumb {
                            background: linear-gradient(to bottom, rgb(8 145 178 / 0.4), rgb(16 185 129 / 0.4));
                        }

                        ::-webkit-scrollbar-thumb:hover {
                            background: linear-gradient(to bottom, rgb(8 145 178 / 0.5), rgb(16 185 129 / 0.5));
                        }

                        ::-webkit-scrollbar-thumb:active {
                            background: linear-gradient(to bottom, rgb(8 145 178 / 0.6), rgb(16 185 129 / 0.6));
                        }
                    }

                    /* Optional: Hide scrollbar until hover */
                    .hide-scrollbar-until-hover {
                        scrollbar-width: none;
                    }

                    .hide-scrollbar-until-hover::-webkit-scrollbar {
                        display: none;
                    }

                    .hide-scrollbar-until-hover:hover::-webkit-scrollbar {
                        display: block;
                    }
                `}
            </style>
            {children}
        </>
    );
}