function showView(view) {

    /* Şu anki viewi yok et */
    if (this.currentView !== undefined) {
        this.currentView.unbind();
        this.currentView.undelegateEvents();
    }

    /* Yeni view oluştur. */
    this.currentView = view;
    this.currentView.delegateEvents();

    return this.currentView;
}
