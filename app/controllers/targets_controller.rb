class TargetsController < ApplicationController
  respond_to :json
  def create
    @target = Target.new target_params
    if @target.save
      if params[:path]
        path = Target.find(params[:path]).path
        @target = Target.update @target.id, {:path => "#{path}.#{@target.id}"}
        @target.save
      else
        @target = Target.update @target.id, {:path => "#{@target.id}"}
        @target.save
      end
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :target => @target
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "create fail"
       }
    end
  end

  def update
    @target = Target.update params[:id], target_params
    if @target.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :target => @target
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @target = Target.find params[:id]
    if @target.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 403,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    @targets = Target.with_count("'#{params[:campaign_id]}'")
      .offset(params[:offset])
      .limit(params[:limit])
    render json: @targets.map do |t|
      {
        id: t.id,
        name: t.name,
        visits: t.visits,
        unique: t.unique
      } 
    end
  end

  def search
    @targets = Target.search(params[:q], {
      offset: params[:offset],
      limit: params[:limit],
      where: { campaign_id: params[:campaign_id] },
      load: false,
      misspellings: {edit_distance: 10},
      minimum_should_match: 0
    })
    ids = []
    @targets.each { |t| ids.push t.id }
    @targets = Target.with_count_2("'#{ids.join("','")}'")
    render json: @targets.map do |t|
      {
        id: t.id,
        name: t.name,
        visits: t.visits,
        unique: t.unique
      } 
    end
  end

  def stats
    render json: Target.getStatistics(params[:campaign_id])
  end

  private
    def target_params
      params.require(:target).permit(:name, :campaign_id, :path)
    end
end
