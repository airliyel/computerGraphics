// src/game/ShadowMatcher.js

const DEFAULT_THRESHOLD = 98;

function normalizeQuaternion(q) {
    const len = Math.hypot(q[0], q[1], q[2], q[3]);

    if (len < 1e-8) {
        return [0, 0, 0, 1];
    }

    return q.map(v => v / len);
}

const ShadowMatcher = {

    getMatchPercentage(currentQuaternion, targetQuaternion) {

        const current = normalizeQuaternion(currentQuaternion);
        const target = normalizeQuaternion(targetQuaternion);

        // q, -q equal rotation
        const dot = Math.abs(
            current[0] * target[0] +
            current[1] * target[1] +
            current[2] * target[2] +
            current[3] * target[3]
        );

        return Math.min(100, dot * 100);
    },

    checkClear(
        currentQuaternion,
        targetQuaternion,
        threshold = DEFAULT_THRESHOLD
    ) {

        const matchPercentage =
            this.getMatchPercentage(
                currentQuaternion,
                targetQuaternion
            );

        return {
            cleared: matchPercentage >= threshold,
            matchPercentage
        };
    }
};

export default ShadowMatcher;