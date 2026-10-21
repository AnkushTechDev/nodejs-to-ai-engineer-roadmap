# Security

Use fictional data when trying the examples. API credentials belong in `.env` or your secret manager and must not be committed. If a key is exposed, revoke it with the provider and replace it; deleting it from the latest file does not remove it from Git history.

The capstones are local learning implementations. Their READMEs identify missing deployment controls. In particular, the HTTP service uses a fixed demo identity and the approval project trusts in-process fixture objects.

To report a sensitive issue after publication, use GitHub private vulnerability reporting if the maintainer enables it, or a private contact listed on the maintainer’s profile. If neither is available, open a minimal issue requesting a private contact without including secrets or exploit details. See [publishing setup](PUBLISHING.md) for maintainer steps.
