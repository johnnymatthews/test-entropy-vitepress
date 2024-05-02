import{_ as e,c as t,o as a,a3 as r}from"./chunks/framework.7ep0oyv4.js";const g=JSON.parse('{"title":"Threshold Signature Scheme","description":"","frontmatter":{},"headers":[],"relativePath":"docs/concepts/threshold-signature-scheme.md","filePath":"docs/concepts/threshold-signature-scheme.md"}'),i={name:"docs/concepts/threshold-signature-scheme.md"},o=r('<h1 id="threshold-signature-scheme" tabindex="-1">Threshold Signature Scheme <a class="header-anchor" href="#threshold-signature-scheme" aria-label="Permalink to &quot;Threshold Signature Scheme&quot;">​</a></h1><ul><li>The TSS Implementation used by Entropy is <strong>Synedrion</strong> <a href="https://github.com/entropyxyz/synedrion" target="_blank" rel="noreferrer">src</a> <a href="https://docs.rs/synedrion" target="_blank" rel="noreferrer">API</a></li></ul><p>The threshold signature scheme used is the 2021 Canetti-Gennaro-Goldfeder-Makriyannis-Peled scheme from the paper <a href="https://eprint.iacr.org/2021/060" target="_blank" rel="noreferrer">&#39;UC Non-Interactive, Proactive, Threshold ECDSA with Identifiable Aborts&#39;</a>.</p><p>For a high level introduction to threshold signature schemes, see <a href="./../basics/introduction.html">this section of the &#39;Entrosplainer&#39;</a> - to summarize, they enable a group of parties to collectively compute a signature without any single party knowing the private key, and requiring very little centralized coordination.</p><p>Doing threshold signing with ECDSA is more complicated than with Schnorr-based signature schemes such as EdDSA, or with RSA. It has taken quite some years of research to come up with a scheme which has good security features whilst not requiring too many communication rounds between parties.</p><p>Threshold schemes are commonly referred to as $t$ of $n$, meaning $t$ parties must participate in the protocol in order to sign a message. Entropy currently uses $n$-of-$n$, meaning rather than choosing a threshold, <strong>all</strong> parties are needed to sign a message. However, this isn&#39;t as dangerous as it might sound, since Entropy has &#39;signing subgroups&#39; of nodes, of which all members hold identical keyshares. So even if a portion of Entropy nodes were to go offline, it would still be possible to sign messages.</p><h2 id="features-of-cggmp21" tabindex="-1">Features of CGGMP21 <a class="header-anchor" href="#features-of-cggmp21" aria-label="Permalink to &quot;Features of CGGMP21&quot;">​</a></h2><h3 id="identifiable-aborts" tabindex="-1">Identifiable aborts <a class="header-anchor" href="#identifiable-aborts" aria-label="Permalink to &quot;Identifiable aborts&quot;">​</a></h3><p>&#39;Identifiable aborts&#39; refers to being able to reveal which party has misbehaved when the signing protocol fails. So if a party gives faulty or intentionally malicious responses during the signing process, the others can determine who is responsible for the failed signature. In Entropy, the misbehaving party can be made public using the Entropy&#39;s blockchain, and a new signing committee selected for another attempt.</p><h3 id="non-interactive" tabindex="-1">Non-interactive <a class="header-anchor" href="#non-interactive" aria-label="Permalink to &quot;Non-interactive&quot;">​</a></h3><p>Only the final round of the signing protocol requires knowledge of the message. The other rounds are known as the &#39;pre-signing&#39; phase. This is what the paper refers to as being &#39;non-interactive&#39;, as it enables having a party generate its &#39;signature share&#39; for a given message without interacting with the other parties. The use-case for this is &#39;cold wallets&#39; which function in isolation. Note however in order to create a &#39;signature share&#39; from a message, you do need the data from the pre-signing stage.</p><h3 id="few-communication-rounds" tabindex="-1">Few communication rounds <a class="header-anchor" href="#few-communication-rounds" aria-label="Permalink to &quot;Few communication rounds&quot;">​</a></h3><p>The paper proposes two different versions of the protocol with a different trade-off between number of communication rounds needed and the amount of computation require. Either 5 or 8 communication rounds are needed to sign a message, with the 8 round version requiring less computation. However, it is worth noting that the 5 round version&#39;s extra computation overhead is only in the case that signing fails. Entropy uses 5 rounds.</p><h3 id="proactive-security" tabindex="-1">Proactive security <a class="header-anchor" href="#proactive-security" aria-label="Permalink to &quot;Proactive security&quot;">​</a></h3><p>The paper includes a <a href="https://eprint.iacr.org/2000/067.pdf" target="_blank" rel="noreferrer">Universally Composable security</a> analysis. The authors claim that &#39;proactive security&#39; against an adaptive attacker is achieved. More specifically, an attacker who is able to completely control up to $t - 1$ nodes between two consecutive key-refresh phases is unable to compromise the scheme.</p><h3 id="distributed-key-generation" tabindex="-1">Distributed key generation <a class="header-anchor" href="#distributed-key-generation" aria-label="Permalink to &quot;Distributed key generation&quot;">​</a></h3><p>Distributed key generation means parties can compute their key shares without central coordination and without any party having knowledge of the secret key.</p><h3 id="key-refreshing" tabindex="-1">Key refreshing <a class="header-anchor" href="#key-refreshing" aria-label="Permalink to &quot;Key refreshing&quot;">​</a></h3><p>In order to allow nodes to join or leave the network, as well as to provide proactive security, key-shares can be periodically &#39;refreshed&#39;. Without changing the secret key, new key shares are generated which are incompatible with the old ones. This can be achieved in 3 communication rounds.</p><h3 id="paillier-encryption-as-a-commitment-scheme" tabindex="-1">Paillier encryption as a commitment scheme <a class="header-anchor" href="#paillier-encryption-as-a-commitment-scheme" aria-label="Permalink to &quot;Paillier encryption as a commitment scheme&quot;">​</a></h3><p>The protocol uses Paillier encryption, which is a type of additive homomorphic encryption. Homomorphic encryption refers to encryption schemes which allow computation to be performed on encrypted data, which give an encrypted result without revealing the data or knowing the encryption key. Paillier is &#39;additive&#39;, so given two encrypted numbers and the public key used to encrypt them, we can compute the encryption of their sum, without knowing what the numbers were. Also, given an encrypted number, we can compute the encryption of the multiplication of that number by a known number.</p><p>Using these primitives, it is possible for two parties, each of which have a secret number, to compute shares of the multiplication of the two secret numbers, without learning the other party&#39;s secret number. This is referred to in the paper as &#39;pairwise multiplication&#39;.</p><p>So each party has a Paillier keypair and knows the public keys of each other party. Using this pairwise multiplication technique all parties are able to make a contribution or &#39;commitment&#39; to the random nonce ($k$ value) used in ECDSA signing as well as to the signature itself using their private key shares.</p><h2 id="links-to-talks" tabindex="-1">Links to talks <a class="header-anchor" href="#links-to-talks" aria-label="Permalink to &quot;Links to talks&quot;">​</a></h2><ul><li><p><a href="https://www.fireblocks.com/blog/ccs-threshold-ecdsa" target="_blank" rel="noreferrer">Presentation on the CGGMP21 scheme from Nikolaos Makriyannis</a></p></li><li><p><a href="https://youtu.be/wtxH3PuMAgQ" target="_blank" rel="noreferrer">Presentation of GG20 (CGGMP21&#39;s predecessor) from Steven Goldfelder</a></p></li></ul>',25),n=[o];function s(h,c,l,d,p,u){return a(),t("div",null,n)}const f=e(i,[["render",s]]);export{g as __pageData,f as default};
