const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");
const utils = require("../../Utilities/Utility");
const quizz = require("../../commands/quizz/start");

module.exports = class PresentationCommand extends Command {
  constructor(client) {
    super(client, {
      name: "presentationjourj",
      group: "presentation",
      aliases: ["pjj"],
      memberName: "presentationjourj",
      description: "Je suis capable de me présenter",
      examples: ["presente"]
    });
  }

  async run(message) {
    let citationsTTS = [
      "Bonjour,Je m'appelle @KaamelottDiscordBot. J'ai été conçu par Julien, Florent, Aloïs et Mickael avec Discord.JS et commando",
      "Je passe le plus clair de mon temps à jouer au cul de chouette.",
      "Je fais partie de la catégorie des bottes",
      "Je balance des citations comme", //4
      "Je peux aussi insulter les gens de", //4
      "ou de", //1
      "Tout cela est tiré des épisodes de Kaamelott", //5
      "Je peux aussi vous proposer de jouer à un quiz. Les règles sont simples, Perceval va vous les présenter.", //10
      "Plus sérieusement, le quiz porte sur les citations de Kaamelott dont il faut retrouver l'auteur. Je sais aussi réveiller une réunion de la Table Ronde.", //12
      "Je sais aussi chanter", //3
      "Je pense avoir fait le tour, vous avez compris ?", //5
      "Je suis en vente au prix de 100 pièces d'or.", //4
      "Plus sérieusement, je serai disponible gratuitement sur Slack.", //6
      "Non en vrai que sur Discord.", //4
      "Voilà, j'ai fini. J'espère vous avoir convaincu.",
    ]; //6

    let citationsAudio = [
      "tout_le_monde_s_en_branle_moi_le_premier.mp3",
      "ca_vous_fait_pas_mal_a_la_tete_de_glandouiller.mp3",
      "a_roulettes.mp3",
      "intro_comaque.mp3",
      "sans_etre_totalement_repoussant_il_n_y_a_pas_de_quoi_bousculer_une_charette.mp3",
      "fils_d_unijambiste.mp3",
      "ptite_pucelle.mp3",
      "sans_deconner.mp3",
      "cest_facile_on_peut_jouer_soit_avec_des_haricots_soit_avec_des_lentilles.mp3",
      "reveil.mp3",
      "a_la_volette1.mp3",
      "fournis_notice.mp3",
      "cest_honteux.mp3",
      "faut_ce_qui_faut.mp3",
      "bucher3.mp3",
      "voila_cest_pro.mp3",
      "wooouuuhouhouhou_c_est_mortel.mp3",
      "vous_rigolez_jespere.mp3",
      "faut-y-aller-a-la-zob.mp3",
      "merci_de_rien.mp3",
      "dites_tout_de_suite_que_j_ai_des_idees_de_tocard.mp3",
      "vous_allez_fermer_vos_mouilles_oui.mp3",
      "bon_bah_aller_on_demarre_et_ouvrez_les_echauguettes.mp3",
    ];

    let VC = message.member.voiceChannel;

    let path = "./commands/presentation/";

    VC.join()
          .then(connection => {
            const dispatcher = connection.playFile(path + citationsAudio[20]);

            dispatcher.on("end", end => {
              VC.leave();
            });
          })
          .catch(console.error);

        new Promise((resolve, reject) => {
          setTimeout(() => resolve("Fait!"), 5000);
        })
        .then(async function() {
          VC.join()
          .then(connection => {
            let dispatcher = connection.playFile(path + citationsAudio[21]);

            dispatcher.on("end", end => {
              dispatcher = connection.playFile(path + citationsAudio[22]);
              dispatcher.on("end", end => {
                VC.leave();
              });
            });
          })
          .catch(console.error);

        new Promise((resolve, reject) => {
          setTimeout(() => resolve("Fait!"), 5000);
        })
        .then(async function() {


    message.channel.send(citationsTTS[0], { tts: true });

    new Promise((resolve, reject) => {
      setTimeout(() => resolve("Fait!"), 11000);
    })
      .then(async function() {
        VC.join()
          .then(connection => {
            const dispatcher = connection.playFile(path + citationsAudio[0]);

            dispatcher.on("end", end => {
              VC.leave();
            });
          })
          .catch(console.error);

        new Promise((resolve, reject) => {
          setTimeout(() => resolve("Fait!"), 3000);
        })
        .then(async function() {
            message.channel.send(citationsTTS[1], { tts: true });

            new Promise((resolve, reject) => {
              setTimeout(() => resolve("Fait!"), 5000);
            })
              .then(async function() {
                VC.join()
                  .then(connection => {
                   const dispatcher = connection.playFile(
                      path + citationsAudio[1]
                    );

                    dispatcher.on("end", end => {
                        VC.leave();
                      });
                  })
                  .catch(console.error);

                new Promise((resolve, reject) => {
                  setTimeout(() => resolve("Fait!"), 3000);
                })
          .then(async function() {
            message.channel.send(citationsTTS[2], { tts: true });

            new Promise((resolve, reject) => {
              setTimeout(() => resolve("Fait!"), 4000);
            })
              .then(async function() {
                VC.join()
                  .then(connection => {
                    let dispatcher = connection.playFile(
                      path + citationsAudio[2]
                    );

                    dispatcher.on("end", end => {
                      connection.playFile(path + citationsAudio[3]);
                      dispatcher.on("end", end => {
                        VC.leave();
                      });
                    });
                  })
                  .catch(console.error);

                new Promise((resolve, reject) => {
                  setTimeout(() => resolve("Fait!"), 5000);
                })
                  .then(async function() {
                    message.channel.send(citationsTTS[3], { tts: true });

                    new Promise((resolve, reject) => {
                      setTimeout(() => resolve("Fait!"), 4000);
                    })
                      .then(async function() {
                        VC.join()
                          .then(connection => {
                            const dispatcher = connection.playFile(
                              path + citationsAudio[4]
                            );

                            dispatcher.on("end", end => {
                              VC.leave();
                            });
                          })
                          .catch(console.error);

                        new Promise((resolve, reject) => {
                          setTimeout(() => resolve("Fait!"), 3000);
                        })
                          .then(async function() {
                            message.channel.send(citationsTTS[4], {
                              tts: true
                            });

                            new Promise((resolve, reject) => {
                              setTimeout(() => resolve("Fait!"), 4000);
                            })
                              .then(async function() {
                                VC.join()
                                  .then(connection => {
                                    const dispatcher = connection.playFile(
                                      path + citationsAudio[5]
                                    );

                                    dispatcher.on("end", end => {
                                      VC.leave();
                                    });
                                  })
                                  .catch(console.error);

                                new Promise((resolve, reject) => {
                                  setTimeout(() => resolve("Fait!"), 1500);
                                })
                                  .then(async function() {
                                    message.channel.send(citationsTTS[5], {
                                      tts: true
                                    });

                                    new Promise((resolve, reject) => {
                                      setTimeout(() => resolve("Fait!"), 2000);
                                    })
                                      .then(async function() {
                                        VC.join()
                                          .then(connection => {
                                            const dispatcher = connection.playFile(
                                              path + citationsAudio[6]
                                            );

                                            dispatcher.on("end", end => {
                                              VC.leave();
                                            });
                                          })
                                          .catch(console.error);

                                        new Promise((resolve, reject) => {
                                          setTimeout(
                                            () => resolve("Fait!"),
                                            1000
                                          );
                                        })
                                          .then(async function() {
                                            message.channel.send(
                                              citationsTTS[6],
                                              { tts: true }
                                            );

                                            new Promise((resolve, reject) => {
                                              setTimeout(
                                                () => resolve("Fait!"),
                                                4000
                                              );
                                            })
                                              .then(async function() {
                                                VC.join()
                                                  .then(connection => {
                                                    const dispatcher = connection.playFile(
                                                      path + citationsAudio[7]
                                                    );

                                                    dispatcher.on(
                                                      "end",
                                                      end => {
                                                        VC.leave();
                                                      }
                                                    );
                                                  })
                                                  .catch(console.error);

                                                new Promise(
                                                  (resolve, reject) => {
                                                    setTimeout(
                                                      () => resolve("Fait!"),
                                                      2000
                                                    );
                                                  }
                                                )
                                                  .then(async function() {
                                                    message.channel.send(
                                                      citationsTTS[7],
                                                      { tts: true }
                                                    );
                                                    new Promise(
                                                      (resolve, reject) => {
                                                        setTimeout(
                                                          () =>
                                                            resolve("Fait!"),
                                                          10000
                                                        );
                                                      }
                                                    )
                                                      .then(async function() {
                                                        VC.join()
                                                          .then(connection => {
                                                            const dispatcher = connection.playFile(
                                                              path +
                                                                citationsAudio[8]
                                                            );

                                                            dispatcher.on(
                                                              "end",
                                                              end => {
                                                                VC.leave();
                                                              }
                                                            );
                                                          })
                                                          .catch(console.error);

                                                        new Promise(
                                                          (resolve, reject) => {
                                                            setTimeout(
                                                              () =>
                                                                resolve(
                                                                  "Fait!"
                                                                ),
                                                              32000
                                                            );
                                                          }
                                                        )
                                                          .then(
                                                            async function() {
                                                              message.channel.send(
                                                                citationsTTS[8],
                                                                { tts: true }
                                                              );
                                                              new Promise(
                                                                (
                                                                  resolve,
                                                                  reject
                                                                ) => {
                                                                  setTimeout(
                                                                    () =>
                                                                      resolve(
                                                                        "Fait!"
                                                                      ),
                                                                    12000
                                                                  );
                                                                }
                                                              )
                                                                .then(
                                                                  async function() {
                                                                    VC.join()
                                                                      .then(
                                                                        connection => {
                                                                          const dispatcher = connection.playFile(
                                                                            path +
                                                                              citationsAudio[9]
                                                                          );

                                                                          dispatcher.on(
                                                                            "end",
                                                                            end => {
                                                                              VC.leave();
                                                                            }
                                                                          );
                                                                        }
                                                                      )
                                                                      .catch(
                                                                        console.error
                                                                      );

                                                                    new Promise(
                                                                      (
                                                                        resolve,
                                                                        reject
                                                                      ) => {
                                                                        setTimeout(
                                                                          () =>
                                                                            resolve(
                                                                              "Fait!"
                                                                            ),
                                                                          6000
                                                                        );
                                                                      }
                                                                    )
                                                                    .then(
                                                                      async function() {
                                                                        message.channel.send(
                                                                          citationsTTS[9],
                                                                          {
                                                                            tts: true
                                                                          }
                                                                        );

                                                                        new Promise(
                                                                          (
                                                                            resolve,
                                                                            reject
                                                                          ) => {
                                                                            setTimeout(
                                                                              () =>
                                                                                resolve(
                                                                                  "Fait!"
                                                                                ),
                                                                              4000
                                                                            );
                                                                          }
                                                                        )
                                                                          .then(
                                                                            async function() {
                                                                              VC.join()
                                                                                .then(
                                                                                  connection => {
                                                                                    const dispatcher = connection.playFile(
                                                                                      path +
                                                                                        citationsAudio[10]
                                                                                    );

                                                                                    dispatcher.on(
                                                                                      "end",
                                                                                      end => {
                                                                                        VC.leave();
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                )
                                                                                .catch(
                                                                                  console.error
                                                                                );

                                                                              new Promise(
                                                                                (
                                                                                  resolve,
                                                                                  reject
                                                                                ) => {
                                                                                  setTimeout(
                                                                                    () =>
                                                                                      resolve(
                                                                                        "Fait!"
                                                                                      ),
                                                                                    11000
                                                                                  );
                                                                                }
                                                                              )
                                                                      .then(
                                                                        async function() {
                                                                          message.channel.send(
                                                                            citationsTTS[10],
                                                                            {
                                                                              tts: true
                                                                            }
                                                                          );

                                                                          new Promise(
                                                                            (
                                                                              resolve,
                                                                              reject
                                                                            ) => {
                                                                              setTimeout(
                                                                                () =>
                                                                                  resolve(
                                                                                    "Fait!"
                                                                                  ),
                                                                                5000
                                                                              );
                                                                            }
                                                                          )
                                                                            .then(
                                                                              async function() {
                                                                                VC.join()
                                                                                  .then(
                                                                                    connection => {
                                                                                      const dispatcher = connection.playFile(
                                                                                        path +
                                                                                          citationsAudio[11]
                                                                                      );

                                                                                      dispatcher.on(
                                                                                        "end",
                                                                                        end => {
                                                                                          VC.leave();
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  )
                                                                                  .catch(
                                                                                    console.error
                                                                                  );

                                                                                new Promise(
                                                                                  (
                                                                                    resolve,
                                                                                    reject
                                                                                  ) => {
                                                                                    setTimeout(
                                                                                      () =>
                                                                                        resolve(
                                                                                          "Fait!"
                                                                                        ),
                                                                                      3000
                                                                                    );
                                                                                  }
                                                                                )
                                                                                  .then(
                                                                                    async function() {
                                                                                      message.channel.send(
                                                                                        citationsTTS[11],
                                                                                        {
                                                                                          tts: true
                                                                                        }
                                                                                      );

                                                                                      new Promise(
                                                                                        (
                                                                                          resolve,
                                                                                          reject
                                                                                        ) => {
                                                                                          setTimeout(
                                                                                            () =>
                                                                                              resolve(
                                                                                                "Fait!"
                                                                                              ),
                                                                                            4000
                                                                                          );
                                                                                        }
                                                                                      )
                                                                                        .then(
                                                                                          async function() {
                                                                                            VC.join()
                                                                                              .then(
                                                                                                connection => {
                                                                                                  let dispatcher = connection.playFile(
                                                                                                    path +
                                                                                                      citationsAudio[12]
                                                                                                  );

                                                                                                  dispatcher.on(
                                                                                                    "end",
                                                                                                    end => {
                                                                                                      dispatcher = connection.playFile(
                                                                                                        path +
                                                                                                          citationsAudio[13]
                                                                                                      );
                                                                                                      dispatcher.on(
                                                                                                        "end",
                                                                                                        end => {
                                                                                                          VC.leave();
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              )
                                                                                              .catch(
                                                                                                console.error
                                                                                              );
                                                                                            new Promise(
                                                                                              (
                                                                                                resolve,
                                                                                                reject
                                                                                              ) => {
                                                                                                setTimeout(
                                                                                                  () =>
                                                                                                    resolve(
                                                                                                      "Fait!"
                                                                                                    ),
                                                                                                  4000
                                                                                                );
                                                                                              }
                                                                                            )
                                                                                              .then(
                                                                                                async function() {
                                                                                                  message.channel.send(
                                                                                                    citationsTTS[12],
                                                                                                    {
                                                                                                      tts: true
                                                                                                    }
                                                                                                  );
                                                                                                  new Promise(
                                                                                                    (
                                                                                                      resolve,
                                                                                                      reject
                                                                                                    ) => {
                                                                                                      setTimeout(
                                                                                                        () =>
                                                                                                          resolve(
                                                                                                            "Fait!"
                                                                                                          ),
                                                                                                        6000
                                                                                                      );
                                                                                                    }
                                                                                                  )
                                                                                                    .then(
                                                                                                      async function() {
                                                                                                        VC.join()
                                                                                                          .then(
                                                                                                            connection => {
                                                                                                              const dispatcher = connection.playFile(
                                                                                                                path +
                                                                                                                  citationsAudio[14]
                                                                                                              );

                                                                                                              dispatcher.on(
                                                                                                                "end",
                                                                                                                end => {
                                                                                                                  VC.leave();
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          )
                                                                                                          .catch(
                                                                                                            console.error
                                                                                                          );
                                                                                                        new Promise(
                                                                                                          (
                                                                                                            resolve,
                                                                                                            reject
                                                                                                          ) => {
                                                                                                            setTimeout(
                                                                                                              () =>
                                                                                                                resolve(
                                                                                                                  "Fait!"
                                                                                                                ),
                                                                                                              2000
                                                                                                            );
                                                                                                          }
                                                                                                        )
                                                                                                          .then(
                                                                                                            async function() {
                                                                                                              message.channel.send(
                                                                                                                citationsTTS[13],
                                                                                                                {
                                                                                                                  tts: true
                                                                                                                }
                                                                                                              );
                                                                                                              new Promise(
                                                                                                                (
                                                                                                                  resolve,
                                                                                                                  reject
                                                                                                                ) => {
                                                                                                                  setTimeout(
                                                                                                                    () =>
                                                                                                                      resolve(
                                                                                                                        "Fait!"
                                                                                                                      ),
                                                                                                                    4000
                                                                                                                  );
                                                                                                                }
                                                                                                              )
                                                                                                                .then(
                                                                                                                  async function() {
                                                                                                                    VC.join()
                                                                                                                      .then(
                                                                                                                        connection => {
                                                                                                                          const dispatcher = connection.playFile(
                                                                                                                            path +
                                                                                                                              citationsAudio[15]
                                                                                                                          );

                                                                                                                          dispatcher.on(
                                                                                                                            "end",
                                                                                                                            end => {
                                                                                                                              VC.leave();
                                                                                                                            }
                                                                                                                          );
                                                                                                                        }
                                                                                                                      )
                                                                                                                      .catch(
                                                                                                                        console.error
                                                                                                                      );
                                                                                                                    new Promise(
                                                                                                                      (
                                                                                                                        resolve,
                                                                                                                        reject
                                                                                                                      ) => {
                                                                                                                        setTimeout(
                                                                                                                          () =>
                                                                                                                            resolve(
                                                                                                                              "Fait!"
                                                                                                                            ),
                                                                                                                          3000
                                                                                                                        );
                                                                                                                      }
                                                                                                                    )
                                                                                                                      .then(
                                                                                                                        async function() {
                                                                                                                          message.channel.send(
                                                                                                                            citationsTTS[14],
                                                                                                                            {
                                                                                                                              tts: true
                                                                                                                            }
                                                                                                                          );
                                                                                                                          new Promise(
                                                                                                                            (
                                                                                                                              resolve,
                                                                                                                              reject
                                                                                                                            ) => {
                                                                                                                              setTimeout(
                                                                                                                                () =>
                                                                                                                                  resolve(
                                                                                                                                    "Fait!"
                                                                                                                                  ),
                                                                                                                                5000
                                                                                                                              );
                                                                                                                            }
                                                                                                                          )
                                                                                                                            .then(
                                                                                                                              async function() {
                                                                                                                                VC.join()
                                                                                                                                  .then(
                                                                                                                                    connection => {
                                                                                                                                      let dispatcher = connection.playFile(
                                                                                                                                        path +
                                                                                                                                          citationsAudio[16]
                                                                                                                                      );

                                                                                                                                      dispatcher.on(
                                                                                                                                        "end",
                                                                                                                                        end => {
                                                                                                                                          dispatcher = connection.playFile(
                                                                                                                                            path +
                                                                                                                                              citationsAudio[17]
                                                                                                                                          );
                                                                                                                                          dispatcher.on(
                                                                                                                                            "end",
                                                                                                                                            end => {
                                                                                                                                              dispatcher = connection.playFile(
                                                                                                                                                path +
                                                                                                                                                  citationsAudio[18]
                                                                                                                                              );
                                                                                                                                              dispatcher.on(
                                                                                                                                                "end",
                                                                                                                                                end => {
                                                                                                                                                  dispatcher = connection.playFile(
                                                                                                                                                    path +
                                                                                                                                                      citationsAudio[19]
                                                                                                                                                  );
                                                                                                                                                  dispatcher.on(
                                                                                                                                                    "end",
                                                                                                                                                    end => {
                                                                                                                                                      VC.leave();
                                                                                                                                                    }
                                                                                                                                                  );
                                                                                                                                                }
                                                                                                                                              );
                                                                                                                                            }
                                                                                                                                          );
                                                                                                                                        }
                                                                                                                                      );
                                                                                                                                    }
                                                                                                                                  )
                                                                                                                                  .catch(
                                                                                                                                    console.error
                                                                                                                                  );
                                                                                                                              }
                                                                                                                            )
                                                                                                                            .catch(
                                                                                                                              function(
                                                                                                                                error
                                                                                                                              ) {
                                                                                                                                console.log(
                                                                                                                                  error
                                                                                                                                );
                                                                                                                              }
                                                                                                                            );
                                                                                                                        }
                                                                                                                      )
                                                                                                                      .catch(
                                                                                                                        function(
                                                                                                                          error
                                                                                                                        ) {
                                                                                                                          console.log(
                                                                                                                            error
                                                                                                                          );
                                                                                                                        }
                                                                                                                      );
                                                                                                                  }
                                                                                                                )
                                                                                                                .catch(
                                                                                                                  function(
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    console.log(
                                                                                                                      error
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                            }
                                                                                                          )
                                                                                                          .catch(
                                                                                                            function(
                                                                                                              error
                                                                                                            ) {
                                                                                                              console.log(
                                                                                                                error
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                      }
                                                                                                    )
                                                                                                                .catch(
                                                                                                                  function(
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    console.log(
                                                                                                                      error
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                            }
                                                                                                          )
                                                                                                          .catch(
                                                                                                            function(
                                                                                                              error
                                                                                                            ) {
                                                                                                              console.log(
                                                                                                                error
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                      }
                                                                                                    )
                                                                                                    .catch(
                                                                                                      function(
                                                                                                        error
                                                                                                      ) {
                                                                                                        console.log(
                                                                                                          error
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                }
                                                                                              )
                                                                                              .catch(
                                                                                                function(
                                                                                                  error
                                                                                                ) {
                                                                                                  console.log(
                                                                                                    error
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                          }
                                                                                        )
                                                                                        .catch(
                                                                                          function(
                                                                                            error
                                                                                          ) {
                                                                                            console.log(
                                                                                              error
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                    }
                                                                                  )
                                                                                  .catch(
                                                                                    function(
                                                                                      error
                                                                                    ) {
                                                                                      console.log(
                                                                                        error
                                                                                      );
                                                                                    }
                                                                                  );
                                                                              }
                                                                            )
                                                                                  .catch(
                                                                                    function(
                                                                                      error
                                                                                    ) {
                                                                                      console.log(
                                                                                        error
                                                                                      );
                                                                                    }
                                                                                  );
                                                                              }
                                                                            )
                                                                            .catch(
                                                                                function(
                                                                                  error
                                                                                ) {
                                                                                  console.log(
                                                                                    error
                                                                                  );
                                                                                }
                                                                              );
                                                                          }
                                                                        )
                                                                            .catch(
                                                                              function(
                                                                                error
                                                                              ) {
                                                                                console.log(
                                                                                  error
                                                                                );
                                                                              }
                                                                            );
                                                                        }
                                                                      )
                                                                      .catch(
                                                                        function(
                                                                          error
                                                                        ) {
                                                                          console.log(
                                                                            error
                                                                          );
                                                                        }
                                                                      );
                                                                  }
                                                                )
                                                                .catch(function(
                                                                  error
                                                                ) {
                                                                  console.log(
                                                                    error
                                                                  );
                                                                });
                                                            }
                                                          )
                                                          .catch(function(
                                                            error
                                                          ) {
                                                            console.log(error);
                                                          });
                                                      })
                                                      .catch(function(error) {
                                                        console.log(error);
                                                      });
                                                  })
                                                  .catch(function(error) {
                                                    console.log(error);
                                                  });
                                              })
                                              .catch(function(error) {
                                                console.log(error);
                                              });
                                          })
                                          .catch(function(error) {
                                            console.log(error);
                                          });
                                      })
                                      .catch(function(error) {
                                        console.log(error);
                                      });
                                  })
                                  .catch(function(error) {
                                    console.log(error);
                                  });
                              }).catch(function(error) {
                                console.log(error);
                              });
                          }).catch(function(error) {
                            console.log(error);
                          });
                      })
                              .catch(function(error) {
                                console.log(error);
                              });
                          })
                          .catch(function(error) {
                            console.log(error);
                          });
                      })
                      .catch(function(error) {
                        console.log(error);
                      });
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
